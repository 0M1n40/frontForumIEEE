import React, { useState } from 'react';
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

function CardDuvida({ duvida, onCurtirDuvida }) {
  const { user } = useAuth(); // Usuário logado
  const navigate = useNavigate();

  if (!duvida || typeof duvida !== 'object') {
    console.warn("CardDuvida: Prop 'duvida' é inválida.", duvida);
    return null;
  }

  // Desestruturação com valores padrão para segurança
  const {
    id,
    usuarioId,
    nomeUsuario = 'Usuário Anônimo',
    titulo = 'Título indisponível',
    descricao = 'Descrição indisponível',
    categoria = 'Geral',
    dataPostagem,
    curtidas = 0,
    usuariosQueCurtiram = [],
    respostasCount = 0,
    
  } = duvida;

  

  // Verifica se o usuário logado é o dono da dúvida
  const isOwner = user && user.id === usuarioId;

  // Estado local para curtidas para feedback imediato na UI
  const [localCurtido, setLocalCurtido] = useState(
    user && usuariosQueCurtiram && usuariosQueCurtiram.includes(user.id)
  );
  const [localTotalCurtidas, setLocalTotalCurtidas] = useState(curtidas);

  const handleCardClick = (e) => {
    if (e.target.closest('button') || e.target.closest('a[href]')) {
      return;
    }
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/duvidas/${id}`);
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
    if (onCurtirDuvida) {
      onCurtirDuvida(id, novoStatusCurtida);
    }
  };

  return (
    <div
      className="border border-gray-300 bg-[#E0D9D1] rounded-lg shadow-md flex flex-col justify-between overflow-hidden mb-6 transition-shadow duration-300 hover:shadow-2xl hover:scale-102 cursor-pointer"
    >
      <div>
        {/* Cabeçalho do Card: Autor da Dúvida e Categoria/Data */}
        <div className="flex w-full bg-[#0D334D] text-white py-3 px-4 items-center gap-3">

          <UserCircleIcon className="h-10 w-10 rounded-full text-gray-300 flex-shrink-0" />

          <div className="flex-grow min-w-0">

            <h3 className="text-md font-semibold truncate" title={nomeUsuario}>{nomeUsuario}</h3>
            <p className="text-xs text-gray-300 truncate" title={categoria}>#{categoria}</p>
          </div>
          <span className="text-xs text-gray-300 self-start pt-1 flex-shrink-0">{formatarData(dataPostagem)}</span>
        </div>

        {/* Conteúdo da Dúvida */}
        <div className="p-4 cursor-pointer" onClick={handleCardClick}>
          <h4 className="text-lg font-bold text-gray-800 uppercase mb-2 truncate" title={titulo}>{titulo}</h4>
          <p className="text-gray-700 text-sm break-words">
            {descricao.length > 150 ? `${descricao.substring(0, 147)}...` : descricao}
          </p>
        </div>
      </div>

      

      {/* Ações no Card (Curtir, Responder) */}
      <div className="p-4 border-t border-gray-200"> {/* Borda mais suave */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 text-gray-600">
            <button
              onClick={handleCurtir}
              title="Curtir"
              className={`flex items-center focus:outline-none transition-colors ${localCurtido ? 'text-[#0D334D] font-semibold' : 'text-gray-500 hover:text-[#0D334D]'}`}
            >
              <HandThumbUpIcon className={`h-5 w-5 mr-1 ${localCurtido ? 'fill-current' : ''}`} />
              {localTotalCurtidas}
            </button>
            <Link to={`/duvidas/${id}#respostas`} className="flex items-center text-gray-500 hover:text-[#0D334D] transition-colors">
              <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5 mr-1" />
              {respostasCount}
            </Link>
            {isOwner && (
              <div className="flex gap-2">
                <Link
                  to={`/editarduvida/${id}`}
                  className="w-1/2 text-sm text-orange-400 hover:text-orange-700 flex items-center justify-center py-2.5 transition-colors"
                >
                  <PencilIcon className="h-4 w-4 mr-1.5" /> Editar
                </Link>
                <Link
                  to={`/deletarduvida/${id}`}
                  className="w-1/2 text-sm text-red-600 hover:text-red-900 flex items-center justify-center py-2.5 "
                >
                  <TrashIcon className="h-4 w-4 mr-1.5" /> Deletar
                </Link>
              </div>
            )}

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



    </div>
  );
}

export default CardDuvida;