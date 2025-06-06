'use server';

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ChatBubbleOvalLeftEllipsisIcon, HandThumbUpIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import api from '../../api/axios';

const formatarData = (isoString) => {
  if (!isoString) return 'Data indisponível';
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(isoString));
  } catch (e) {
    console.error("Erro ao formatar data:", isoString, e);
    return 'Data inválida';
  }
};

const UserCircleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

function CardDuvida({ duvida }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [localCurtido, setLocalCurtido] = useState(false);
  const [totalCurtidas, setTotalCurtidas] = useState(0);
  const [respostasCount, setRespostasCount] = useState(0);

  if (!duvida || typeof duvida !== 'object') {
    console.warn("CardDuvida: Prop 'duvida' inválida:", duvida);
    return null;
  }

  const {
    id,
    userId,
    title = 'Título indisponível',
    content = 'Descrição indisponível',
    category = 'Geral',
    solved = 0,
    createdAt,
  } = duvida;

  const nomeUsuario = duvida?.user?.name || 'Usuário';
  const isOwner = user && user.id === userId;

  useEffect(() => {
    const fetchCurtidas = async () => {
      try {
        const curtidasRes = await (await api.get(`/duvidas/curtidas/${id}`)).data
        setTotalCurtidas(curtidasRes.likes || 0)
        
        if (user) {
          const curtidoRes = await (await api.get(`/duvidas/curtidas/${id}/user/${user.id}`)).data
          setLocalCurtido(Boolean(curtidoRes).liked);
        }

        // Contagem de respostas pode ser ativada se necessário:
        // const respostasRes = await api.get(`/respostas/duvida/${id}`);
        // setRespostasCount(respostasRes.data.length || 0);
      } catch (error) {
        console.error("Erro ao buscar curtidas ou respostas:", error);
      }
    };

    fetchCurtidas();
  }, [id, user]);

  const handleCardClick = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;
    navigate(user ? `/duvidas/${id}` : '/login');
  };

  const handleCurtir = async (e) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }

    const novoStatus = !localCurtido;
    setLocalCurtido(novoStatus);
    setTotalCurtidas((prev) => (novoStatus ? prev + 1 : prev - 1));

    try {
      if (novoStatus) {
        await api.post(`/duvidas/${id}/curtir`);
      } else {
        await api.delete(`/duvidas/${id}/curtir`);
      }
    } catch (err) {
      console.error("Erro ao atualizar curtida:", err);
    }
  };

  return (
    <div className="border border-gray-300 bg-[#E0D9D1] rounded-lg shadow-md flex flex-col justify-between overflow-hidden mb-6 transition-shadow hover:shadow-lg">
      <div>
        <div className="flex items-center gap-3 bg-[#0D334D] text-white py-3 px-4">
          <UserCircleIcon className="h-10 w-10 text-gray-300" />
          <div className="flex-grow min-w-0">
            <h3 className="text-md font-semibold truncate" title={nomeUsuario}>{nomeUsuario}</h3>
            <p className="text-xs text-gray-300 truncate">#{category}</p>
          </div>
          <span className="text-xs text-gray-300">{formatarData(createdAt)}</span>
        </div>

        <div className="p-4 cursor-pointer" onClick={handleCardClick}>
          <h4 className="text-lg font-bold text-gray-800 uppercase mb-2 truncate" title={title}>{title}</h4>
          <p className="text-gray-700 text-sm break-words">
            {content.length > 150 ? `${content.substring(0, 147)}...` : content}
          </p>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 text-gray-600">
            <button
              onClick={handleCurtir}
              title="Curtir"
              className={`flex items-center ${localCurtido ? 'text-[#0D334D] font-semibold' : 'text-gray-500 hover:text-[#0D334D]'}`}
            >
              <HandThumbUpIcon className={`h-5 w-5 mr-1 ${localCurtido ? 'fill-current' : ''}`} />
              {totalCurtidas}
            </button>
            <Link to={`/duvidas/${id}#respostas`} className="flex items-center text-gray-500 hover:text-[#0D334D]">
              <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5 mr-1" />
              {respostasCount}
            </Link>
          </div>

          {user ? (
            !isOwner && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/duvidas/${id}#responder`);
                }}
                className="bg-[#0D334D] text-white px-3 py-1.5 rounded-full hover:bg-opacity-90 text-xs sm:text-sm"
              >
                Responder
              </button>
            )
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate('/login');
              }}
              className="bg-gray-500 text-white px-3 py-1.5 rounded-full hover:bg-gray-600 text-xs sm:text-sm"
            >
              Responder
            </button>
          )}
        </div>
      </div>

      {isOwner && (
        <div className="flex border-t border-gray-200 bg-gray-50">
          <Link
            to={`/editarduvida/${id}`}
            className="w-1/2 text-sm text-blue-700 hover:bg-blue-100 flex items-center justify-center py-2.5"
          >
            <PencilIcon className="h-4 w-4 mr-1.5" /> Editar
          </Link>
          <Link
            to={`/deletarduvida/${id}`}
            className="w-1/2 text-sm text-red-600 hover:bg-red-100 flex items-center justify-center py-2.5 border-l border-gray-200"
          >
            <TrashIcon className="h-4 w-4 mr-1.5" /> Deletar
          </Link>
        </div>
      )}
    </div>
  );
}

export default CardDuvida;