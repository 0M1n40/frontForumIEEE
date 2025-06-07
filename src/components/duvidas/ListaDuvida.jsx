import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import CardDuvida from '../duvidas/CardDuvida';
import ModalNovaDuvida from '../duvidas/ModalNovaDuvida';
import { useAuth } from '../../contexts/AuthContext';
import { buscar } from '../../services/Service';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner'; // Importe o spinner se não estiver lá
import api from '../../api/axios';
 
function ListaDuvidas() {
    const navigate = useNavigate();
    const { user } = useAuth();
 
    const [duvidas, setDuvidas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
 
    const buscarDuvidas = useCallback(async () => {
        setIsLoading(true);
        try {
            const duvidas = (await api.get('/duvidas')).data
            
            const duvidasDetalhadas = await Promise.all(
                duvidas.map(async duvida =>{
                    
                    // console.log(duvida)
                    const categoria = await (await api.get(`/categorias/${duvida.categoryId}`)).data
                    const user = (await api.get(`/users/${duvida.userId}`)).data
                    const curtidas = (await api.get(`/duvidas/curtidas/${duvida.id}`)).data
                    const respostas = (await api.get(`/respostas/duvida/${duvida.id}`)).data

                    const respostasDetalhadas = await Promise.all(
                        respostas.map(async resposta => {
                            const user = (await api.get(`/users/${resposta.userId}`)).data
                            return {
                                ...resposta,
                                user
                            }
                        })
                    )

                    console.log(respostasDetalhadas)
                    return {
                        id: duvida.id,
                        usuarioId: duvida.userId,
                        nomeUsuario: user.name,
                        titulo: duvida.title,
                        descricao: duvida.content,
                        categoria: categoria.description,
                        dataPostagem: duvida.createdAt,
                        curtidas: curtidas.likes,
                        respostas: respostasDetalhadas
                    }
                })
            )

            setDuvidas(duvidasDetalhadas)

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
                        .map((duvida) =>(
                                <CardDuvida
                                    key={duvida.id}
                                    duvida={duvida}
                                    respostas={duvida.respostas}
                                />
                            )
                        )}
                </div>
            )}
        </div>
    );
}
 
export default ListaDuvidas;