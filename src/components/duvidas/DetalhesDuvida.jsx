import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';
import RespostasContainer from '../respostas/RespostasContainer';

function DetalhesDuvida() {
    const { questionId: duvidaId } = useParams();
    const [duvida, setDuvida] = useState({});
    const [respostas, setRespostas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchDadosCompletos = async () => {
      try {
        // 1. Busca a dúvida
        const duvidaRes = (await api.get(`/duvidas/${duvidaId}`)).data
        const question = duvidaRes;

        if (!question) throw new Error("Dúvida não encontrada");
        
        // 2. Busca o usuário da dúvida
        const userRes = (await api.get(`/users/${question.userId}`)).data;
        const user = userRes;

        // 3. Busca a categoria da dúvida
        const categoriaRes = (await api.get(`/categorias/${question.categoryId}`)).data
        const categoria = categoriaRes

        // 4. Atualiza o estado com tudo
        setDuvida({
          ...question,
          user,
          category: categoria.description,
        });

        // 5. Busca respostas da dúvida
        const respostasRes = await (await api.get(`/respostas/duvida/${duvidaId}`)).data
        
        const replies = []
        for(const resposta of respostasRes){
            const userReply = (await api.get(`/users/${resposta.userId}`)).data

            replies.push({
                ...resposta,
                user: userReply
            })
        }

        setRespostas(replies)

      } catch (err) {
        console.error("Erro ao carregar dados da dúvida:", err);
        setErro('Erro ao carregar dados da dúvida');
      } finally {
        setLoading(false);
      }
    };

    fetchDadosCompletos();
  }, [duvidaId]);

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p className="text-red-500">{erro}</p>;

  return (
    <div className="p-4 space-y-6">
      <div className="border p-4 rounded bg-white shadow">
        <h1 className="text-2xl font-bold mb-2">{duvida.title}</h1>
        <h2 className="text-lg font-semibold mb-1">{duvida.user?.name}</h2>
        <h3 className="text-md text-gray-600 mb-4">@{duvida.user?.username}</h3>
        <p className="mb-4 text-gray-700">{duvida.content}</p>
        <p className="text-sm text-gray-500">Categoria: {duvida.category}</p>
        <p className="text-sm text-gray-500">Postado em: {new Date(duvida.createdAt).toLocaleString()}</p>
      </div>

      {/* Lista de Respostas */}
      <RespostasContainer respostas={ respostas } />
    </div>
  );
}
export default DetalhesDuvida;
