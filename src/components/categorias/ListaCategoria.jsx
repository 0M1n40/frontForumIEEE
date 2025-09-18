import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { buscar, deletar } from '../../services/Service';
import CardCategoria from './CardCategoria'; 
// import { RotatingLines } from 'react-loader-spinner';
import { MagnifyingGlassIcon, UserCircleIcon, PlusIcon, ArrowLeftOnRectangleIcon, Bars3Icon } from '@heroicons/react/24/outline';

function ListaCategoria() {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading, logout } = useAuth();

    const [categorias, setCategorias] = useState([]);
    const [isApiLoading, setIsApiLoading] = useState(false); // Loading específico para a API

    // useEffect(() => {
    //     if (!isLoading && !isAuthenticated) {
    //         toast.info('Você precisa estar logado para acessar esta página.');
    //         navigate('/login');
    //     }
    // }, [isLoading, isAuthenticated, navigate]);

    async function buscarCategorias() {
        setIsApiLoading(true);
        try {

            await buscar('/categories', setCategorias);
        } catch (error) {

            const errorMessage = error.response?.data?.message || "Erro ao listar as categorias.";
            toast.error(errorMessage);

            console.error("Erro ao listar categorias:", error);
            if (error.response?.status === 403) {
                logout();
            }
        } finally {
            setIsApiLoading(false);
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            buscarCategorias();
        }
    }, [isAuthenticated]);

    async function handleDelete(id) {
        try {
            await deletar(`/categories/${id}`);
            toast.success("Categoria deletada com sucesso!");
            buscarCategorias(); // Re-busca a lista para refletir a exclusão
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Erro ao deletar a categoria.";
            toast.error(errorMessage);
        }
    }

    // Não renderiza nada até que o estado de autenticação seja resolvido
    if (isLoading) {
        return null;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 my-8">
                Categorias
            </h1>
            <div className="flex justify-center mb-8">
                <Link
                    to="/nova-categoria"
                    className=" sm:flex items-center bg-[#0D334D] text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors  "
                >
                    <PlusIcon className="h-5 w-5 " />

                </Link>
            </div>

            {isApiLoading ? (
                <p className="text-gray-500 text-center">Carregando categorias...</p>
                // <div className="flex justify-center"><RotatingLines strokeColor="grey" strokeWidth="5" width="50" /></div>
            ) : categorias.length === 0 ? (
                <p className="text-gray-500 text-center">Nenhuma categoria cadastrada.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categorias.map((categoria) => (
                        <CardCategoria
                            key={categoria.id}
                            categoria={categoria}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListaCategoria;