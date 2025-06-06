import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import CardDuvida from '../duvidas/CardDuvida';
import ModalNovaDuvida from '../duvidas/ModalNovaDuvida';
import { useAuth } from '../../contexts/AuthContext';
import { buscar } from '../../services/Service';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner'; // Importe o spinner se não estiver lá

function ListaDuvidas() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [duvidas, setDuvidas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const buscarDuvidas = useCallback(async () => {
        setIsLoading(true);
        try {
            await buscar('/duvidas', setDuvidas);
        } catch (error) {
            toast.error("Erro ao carregar o feed de dúvidas.");
            console.error("Erro ao buscar dúvidas:", error);
        } finally {
            setIsLoading(false);
        }
    }, []); // O array de dependências vazio faz com que esta função seja criada apenas uma vez.


    useEffect(() => {
        buscarDuvidas();
    }, [buscarDuvidas]);

    // Função para o Modal chamar quando uma nova dúvida for criada, para atualizar a lista.
    const handleNovaDuvidaAdicionada = () => {
        toast.info("Atualizando a lista de dúvidas...");
        buscarDuvidas(); // Re-busca a lista de dúvidas
    };


    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="50" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* O botão para criar uma nova dúvida só aparece se o 'user' existir */}
            {user && (
                <div className="mb-6 text-right">
                    <ModalNovaDuvida onDuvidaSalvaComSucesso={handleNovaDuvidaAdicionada} />
                </div>
            )}

            {duvidas.length === 0 ? (
                <p className="text-center text-gray-500 text-xl my-10">Nenhuma dúvida postada ainda.</p>
            ) : (
                <div className="max-w-3xl mx-auto space-y-6">
                    {duvidas
                        .sort((a, b) => new Date(b.dataPostagem) - new Date(a.dataPostagem))
                        .map((duvida) => (
                            //  A prop 'key' está aqui e a 'div' extra foi removida para um código mais limpo.
                            <CardDuvida
                                key={duvida.id}
                                duvida={duvida}
                            />
                        ))}
                </div>
            )}
        </div>
    );
}

export default ListaDuvidas;