// pages/DetalhesDuvida.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';
import RespostasContainer from '../respostas/RespostasContainer';

function DetalhesDuvida() {
    const { questionId: duvidaId } = useParams();
    const [duvida, setDuvida] = useState(null);
    const [respostas, setRespostas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState('');

    const fetchDados = useCallback(async () => {
        setLoading(true);
        try {
            // 1. BUSCA DE DADOS PRINCIPAIS EM PARALELO
            // Fazemos as duas chamadas mais importantes ao mesmo tempo.
            const [duvidaRes, respostasRes] = await Promise.all([
                api.get(`/duvidas/${duvidaId}`),      // Já contém os dados do usuário e categoria do backend
                api.get(`/respostas/duvida/${duvidaId}`) // Busca a lista de respostas separadamente
            ]);

            // 2. PROCESSA A DÚVIDA PRINCIPAL
            const duvidaCompleta = duvidaRes.data;
            if (!duvidaCompleta) throw new Error("Dúvida não encontrada.");

            // 3. PROCESSA AS RESPOSTAS E BUSCA SEUS AUTORES EM LOTE
            const initialReplies = respostasRes.data || [];
            let finalReplies = initialReplies; // Define um valor padrão

            if (initialReplies.length > 0) {
                // a. Coleta todos os IDs de usuário únicos das respostas
                const userIds = [...new Set(initialReplies.map(reply => reply.userId))];
                
                // b. Faz UMA ÚNICA chamada à API para buscar todos os autores
                const usersRes = await api.post('/users/batch',
                    { ids: userIds });
                const usersMap = new Map(usersRes.data.map(user => [user.id, user]));

                // c. Mapeia as respostas para incluir os dados do autor correspondente
                finalReplies = initialReplies.map(reply => ({
                    ...reply,
                    user: usersMap.get(reply.userId) || { name: 'Usuário Desconhecido' }
                }));
            }
            
            // 4. ATUALIZA OS ESTADOS DE UMA SÓ VEZ
            // Após toda a busca e processamento de dados, atualizamos o estado do componente.

            const user = (await api.get(`/users/${duvidaCompleta.userId}`)).data
            const category = await (await api.get(`/categorias/${duvidaCompleta.categoryId}`)).data
            
            setDuvida({
                ...duvidaCompleta,
                user,
                category
            });
            setRespostas(finalReplies);

        } catch (err) {
            console.error("Erro ao carregar dados:", err);
            setErro("Falha ao carregar os dados da dúvida.");
        } finally {
            setLoading(false);
        }
    }, [duvidaId]);

    useEffect(() => {
        if (duvidaId) {
            fetchDados();
        }
    }, [duvidaId, fetchDados]);

    if (loading) return <p className="text-center p-8">Carregando...</p>;
    if (erro) return <p className="text-red-500 text-center p-8">{erro}</p>;
    if (!duvida) return null; // Não renderiza nada se a dúvida não for encontrada

    return (
        <div className="p-4 space-y-6 max-w-4xl mx-auto">
            <div className="border p-4 rounded bg-white shadow-lg">
                <h1 className="text-3xl font-bold mb-3">{duvida.titulo}</h1>
                <div className="flex items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">{duvida.user.name}</h2>
                </div>
                <p className="text-gray-700 mb-6 whitespace-pre-wrap text-lg">{duvida.descricao}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-3">
                    <span>Categoria: <strong>{duvida.category.description}</strong></span>
                    <span>Postado em: {new Date(duvida.createdAt).toLocaleString('pt-BR')}</span>
                </div>
            </div>
            { respostas.length
                
                ? <RespostasContainer respostas={respostas} />
                : <></>
            }
        </div>
    );
}
export default DetalhesDuvida;