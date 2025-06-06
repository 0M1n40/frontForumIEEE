import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { useAuth } from '../../contexts/AuthContext';
import { atualizar, buscar, cadastrar } from '../../services/Service';
import { toast } from 'react-toastify';

function FormCategoria() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { user, isAuthenticated, isLoading: isAuthLoading, handleLogout } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [categoria, setCategoria] = useState({ description: '' });

    // O useEffect que verifica a autenticação - CORRIGIDO
    useEffect(() => {
        if (!isAuthLoading && !isAuthenticated) {
            toast.info('Você precisa estar logado para acessar esta funcionalidade.');
            navigate('/login');
        }
        
    }, [isAuthLoading, isAuthenticated, navigate]);

    async function buscarPorId(id) {
        try {
            // O interceptor do Axios já adiciona o token
            await buscar(`/categorias/${id}`, setCategoria);
        } catch (error) {
            toast.error('Erro ao buscar a categoria.');
            if (error.response?.status === 403) handleLogout();
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id);
        }
    }, [id]);

    function atualizarEstado(e) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value,
        });
    }

    async function gerarNovaCategoria(e) {
        e.preventDefault();
        setIsLoading(true);

        const categoriaParaEnviar = {description:categoria.description };
console.log("Dados da categoria a serem enviados:", categoriaParaEnviar);
        try {
            if (id !== undefined) {
                // Chamada de ATUALIZAR simplificada - o interceptor adiciona o token
                await atualizar(`/categories/${id}`, categoriaParaEnviar, setCategoria);
                toast.success('Categoria atualizada com sucesso!');
            } else {
                // Chamada de CADASTRAR simplificada - o interceptor adiciona o token
                await cadastrar('/categories', categoriaParaEnviar, setCategoria);
                toast.success('Categoria cadastrada com sucesso!');
            }
            navigate("/categorias");
        } catch (error) {
            // Dica de depuração: Adicione este log para ver o erro completo
            console.error("Erro completo:", error); 
            
            const errorMessage = error.response?.data?.message || "Erro ao processar a categoria. Verifique o console.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? 'Cadastrar Categoria' : 'Editar Categoria'}
            </h1>
            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovaCategoria}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="description">Descrição da Categoria</label>
                    <input
                        type="text"
                        placeholder="Descreva a categoria"
                        name="description"
                        className="border-2 border-slate-700 rounded p-2"
                        value={categoria.description}
                        onChange={atualizarEstado}
                        required
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" width="24" /> : <span>Confirmar</span>}
                </button>
            </form>
        </div>
    );
}

export default FormCategoria;