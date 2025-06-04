// src/components/duvidas/CardDuvida.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ChatBubbleOvalLeftEllipsisIcon, HandThumbUpIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
// import { HandThumbUpIcon as HandThumbUpSolidIcon } from '@heroicons/react/24/solid'; // Para curtida preenchida

const formatarData = (isoString) => {
  if (!isoString) return 'Data indisponível';
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short', // ex: 16/05/2025
    timeStyle: 'short', // ex: 12:40
  }).format(new Date(isoString));
};

// Mock da UserCircleIcon para evitar erro de importação se não existir
const UserCircleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);


function CardDuvida({ duvida, onCurtirDuvida }) { // onAbrirModalExcluir e onEditar removidos, serão links
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!duvida || typeof duvida !== 'object') {
    return null;
  }

  const {
    id,
    usuarioId, // ID do usuário que postou a dúvida
    nomeUsuario = 'Usuário Anônimo',
    // avatarUsuario, // Use se tiver no seu modelo de dúvida
    titulo = 'Título indisponível',
    descricao = 'Descrição indisponível',
    categoria = 'Geral',
    dataPostagem,
    curtidas = 0,
    usuariosQueCurtiram = [],
    respostasCount = 0,
  } = duvida;

  const isOwner = user && user.id === usuarioId;
  const [localCurtido, setLocalCurtido] = useState(user && usuariosQueCurtiram.includes(user.id));
  const [localTotalCurtidas, setLocalTotalCurtidas] = useState(curtidas);

  const handleCardClick = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) { // Ignora cliques em botões ou links
      return;
    }
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/duvidas/${id}`); // Navega para a página de detalhes da dúvida
    }
  };

  const handleCurtir = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    const novoStatusCurtida = !localCurtido;
    setLocalCurtido(novoStatusCurtida);
    setLocalTotalCurtidas(novoStatusCurtida ? localTotalCurtidas + 1 : localTotalCurtidas - 1);
    if (onCurtirDuvida) onCurtirDuvida(id, novoStatusCurtida); // Chama callback para atualizar no backend/estado global
  };

  return (
    <div
      className="border border-gray-300 bg-[#E0D9D1] rounded-lg shadow-md flex flex-col justify-between overflow-hidden mb-6"
      // onClick={handleCardClick} // Opcional: clique no card inteiro navega para detalhes
    >
      <div>
        {/* Cabeçalho do Card: Usuário e Categoria/Data */}
        <div className="flex w-full bg-[#0D334D] text-white py-3 px-4 items-center gap-3">
          {/* <img src={avatarUsuario || DefaultAvatar} className="h-10 w-10 rounded-full" alt={nomeUsuario} /> */}
          <UserCircleIcon className="h-10 w-10 rounded-full text-gray-300" /> {/* Placeholder para avatar */}
          <div className="flex-grow">
            <h3 className="text-md font-semibold">{nomeUsuario}</h3>
            <p className="text-xs text-gray-300">#{categoria}</p>
          </div>
          <span className="text-xs text-gray-300 self-start pt-1">{formatarData(dataPostagem)}</span>
        </div>

        {/* Conteúdo da Dúvida */}
        <div className="p-4 cursor-pointer" onClick={handleCardClick}> {/* Permite clique no conteúdo para detalhes */}
          <h4 className="text-lg font-bold text-gray-800 uppercase mb-2">{titulo}</h4>
          <p className="text-gray-700 text-sm break-words">
            {descricao.length > 150 ? `${descricao.substring(0, 147)}...` : descricao}
          </p>
        </div>
      </div>

      {/* Ações no Card (Curtir, Responder) e links de Editar/Deletar */}
      <div className="p-4 border-t border-gray-300">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 text-gray-600">
            <button
              onClick={handleCurtir}
              title="Curtir"
              className={`flex items-center focus:outline-none ${localCurtido ? 'text-[#0D334D]' : 'text-gray-600 hover:text-[#0D334D]'}`}
            >
              <HandThumbUpIcon className="h-5 w-5 mr-1" />
              {localTotalCurtidas}
            </button>
            <Link to={`/duvidas/${id}#respostas`} className="flex items-center text-gray-600 hover:text-[#0D334D]">
              <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5 mr-1" />
              {respostasCount}
            </Link>
          </div>

          {/* Botão Responder (se não for o dono ou sempre visível) */}
          {!isOwner && (
             <button
             onClick={(e) => {
               e.stopPropagation();
               if (!user) navigate('/login');
               else navigate(`/duvidas/${id}#responder`); // Leva para a seção de resposta da dúvida
             }}
             className="bg-[#0D334D] text-white text-sm px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors"
           >
             Responder
           </button>
          )}
        </div>
      </div>
      
      {/* Links de Edição/Deleção para o Dono */}
      {isOwner && (
        <div className="flex border-t border-gray-300">
          <Link
            to={`/editarduvida/${id}`}
            className="w-1/2 text-sm text-blue-600 hover:bg-blue-50 flex items-center justify-center py-2"
          >
            <PencilIcon className="h-4 w-4 mr-1" /> Editar
          </Link>
          <Link
            to={`/deletarduvida/${id}`}
            className="w-1/2 text-sm text-red-600 hover:bg-red-50 flex items-center justify-center py-2 border-l border-gray-300"
          >
            <TrashIcon className="h-4 w-4 mr-1" /> Deletar
          </Link>
        </div>
      )}
    </div>
  );
}

export default CardDuvida;