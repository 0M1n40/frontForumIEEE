// src/components/postagens/listaPostagens/ListaDuvidas.jsx (ou sua página Home)
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import CardDuvida from '../duvidas/CardDuvida'; // Ajuste para o seu CardDuvida
import ModalNovaDuvida from '../duvidas/ModalNovaDuvida'; // Ajuste para o seu ModalNovaDuvida
import { useAuth } from '../../contexts/AuthContext';
import { buscar } from '../../services/Service';

function ListaDuvidas() {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();
  const token = user?.token;

  const [duvidas, setDuvidas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Usamos useCallback para memoizar buscarDuvidasCallback e evitar re-renders desnecessários
  // ou loops em useEffect se ela for passada como dependência.
  const buscarDuvidasCallback = useCallback(async () => {
    if (!token) return; // Não buscar se não houver token

    setIsLoading(true);
    try {
      await buscar('/duvidas', setDuvidas, {
        headers: { Authorization: token },
      });
    } catch (error) {
      if (error.toString().includes('401') || error.toString().includes('403')) {
        alert('Sessão expirada. Faça login novamente.');
        handleLogout();
      } else {
        alert('Erro ao carregar as dúvidas.');
        console.error("Erro ao buscar dúvidas:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [token, handleLogout]); // setDuvidas e setIsLoading são estáveis

// Em ListaDuvidas.jsx
useEffect(() => {
  if (token) { // Só busca se houver token
    buscarDuvidasCallback();
  } else if(!user && window.location.pathname !== '/login' && window.location.pathname !== '/cadastrar') {
      // alert('Você precisa estar logado para ver as dúvidas.'); // Já tratado no AuthContext talvez
      // navigate('/login');
  }
  // A dependência [token, buscarDuvidasCallback] é geralmente suficiente.
  // Se 'user' mudar (ex: login/logout), o token muda, e isso dispara.
}, [token, buscarDuvidasCallback, user]); // Adicionei 'user' para reagir a mudanças de login/logout se token não mudar imediatamente

 
  // Função que será chamada pelo ModalNovaDuvida após uma dúvida ser salva com sucesso
  const handleNovaDuvidaAdicionada = () => {
    console.log("Nova dúvida foi postada, atualizando a lista...");
    buscarDuvidasCallback(); // Re-busca a lista de dúvidas
  };

  // ... (handleCurtirDuvidaNaLista, etc., se você os mantiver)

  if (isLoading && duvidas.length === 0) { // Mostra loading inicial mais precisamente
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
       
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {user && ( // Mostra o botão de criar dúvida apenas se o usuário estiver logado
        <div className="mb-6 text-right">
          {/* Passa a função de callback para o Modal */}
          <ModalNovaDuvida onDuvidaSalvaComSucesso={handleNovaDuvidaAdicionada} />
        </div>
      )}

      {duvidas.length === 0 && !isLoading ? (
        <p className="text-center text-gray-500 text-xl my-10">Nenhuma dúvida postada ainda.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          {duvidas
            .sort((a, b) => new Date(b.dataPostagem) - new Date(a.dataPostagem))
            .map((duvida) => (
            <CardDuvida 
              key={duvida.id} 
              duvida={duvida} 
              // onCurtirDuvida={handleCurtirDuvidaNaLista} // Se mantiver a lógica de curtidas na lista
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaDuvidas;