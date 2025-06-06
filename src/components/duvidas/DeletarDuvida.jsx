// src/components/duvidas/DeletarDuvida.jsx (ou src/pages/duvidas/DeletarDuvida.jsx)
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { buscar, deletar } from '../../services/Service';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';

function DeletarDuvida() {
  const navigate = useNavigate();
  const { id } = useParams(); // ID da dúvida a ser deletada
  const { user, isAuthenticated, handleLogout } = useAuth();
  const token = user?.token;

  const [isLoading, setIsLoading] = useState(false); // Loading para a ação de deletar
  const [isDataLoading, setIsDataLoading] = useState(true); // Loading para buscar dados da dúvida
  const [duvida, setDuvida] = useState(null); // Armazena os dados da dúvida para exibição
  const [error, setError] = useState('');

  const buscarDuvidaPorId = useCallback(async (duvidaId) => {
    setIsDataLoading(true);
    setError('');
    try {
      await buscar(`/duvidas/${duvidaId}`, setDuvida, {
        headers: { Authorization: token },
      });
    } catch (err) {
      console.error("Erro ao buscar dúvida para deletar:", err);
      setError('Falha ao carregar os dados da dúvida.');
      if (err.toString().includes('401') || err.toString().includes('403')) handleLogout();
    } finally {
      setIsDataLoading(false);
    }
  }, [ isAuthenticated, handleLogout]);

  useEffect(() => {
    if (!isAuthenticated) {
      alert('Você precisa estar logado.');
      navigate('/login');
    }
  }, [ isAuthenticated, navigate]);

  useEffect(() => {
    if (id &&  isAuthenticated) {
      buscarDuvidaPorId(id);
    }
  }, [id,  isAuthenticated, buscarDuvidaPorId]);

  const handleConfirmarDelecao = async () => {
    setIsLoading(true);
    setError('');
    try {
      await deletar(`/duvidas/${id}`, {
        headers: { Authorization: token },
      });
      toast.success('Dúvida deletada com sucesso!');
      navigate('/home'); // Ou para a lista de dúvidas
    } catch (err) {
      console.error("Erro ao deletar dúvida:", err);
      setError('Erro ao deletar a dúvida. Tente novamente.');
      if (err.toString().includes('401') || err.toString().includes('403')) handleLogout();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelar = () => {
    navigate(-1); // Volta para a página anterior (ou para /home ou /duvidas)
  };

  if (isDataLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <RotatingLines strokeColor="#0D334D" width="80" />
      </div>
    );
  }
  
  if (error) {
     return <div className="container mx-auto p-4 text-center text-red-500">{error}</div>;
  }

  if (!duvida) {
    return <div className="container mx-auto p-4 text-center">Dúvida não encontrada.</div>;
  }

  // Adapte a UI para se assemelhar ao seu ModalConfirmacaoExcluir ou DeletarPostagem.tsx
  return (
    <div className="container mx-auto max-w-lg p-4 my-10">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-gray-800">Deletar Dúvida</h1>
        <p className="text-center text-gray-600 mb-6 sm:mb-8">
          Você tem certeza de que deseja apagar a dúvida: <br />
          <strong className="text-lg block mt-2">"{duvida.titulo}"</strong>?
        </p>
        <p className="text-center text-sm text-red-500 mb-6">Esta ação não poderá ser desfeita.</p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleCancelar}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
          >
            Não, Cancelar
          </button>
          <button
            onClick={handleConfirmarDelecao}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#2C3E50] text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center min-w-[120px] focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-70"
          >
            {isLoading ? (
              <RotatingLines strokeColor="white" width="24" />
            ) : (
              'Sim, Deletar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarDuvida;