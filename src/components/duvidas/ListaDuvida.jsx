import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import CardDuvida from '../duvidas/CardDuvida'; 
import ModalNovaDuvida from '../duvidas/ModalNovaDuvida'; 
import { useAuth } from '../../contexts/AuthContext';
import { buscar } from '../../services/Service';

function ListaDuvidas() {
  const navigate = useNavigate();
  const { isAuthenticated, user, handleLogout } = useAuth();
  
  const token = user?.token;

  const [duvidas, setDuvidas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  
  const buscarDuvidasCallback = useCallback(async () => {
    if (!isAuthenticated) return;
    
    function callback(resposta){
      console.log(resposta)
      if (Array.isArray(resposta.questions)) {
        setDuvidas(resposta.questions);
      } else if (Array.isArray(resposta?.content)) {
        setDuvidas(resposta.content);
      } else {
        console.error('Formato inesperado de resposta:', resposta);
        setDuvidas([]);
      }
        
    }

    setIsLoading(true);
    try {
      
      await buscar('http://localhost:3000/api/duvidas', (resposta) => callback(resposta), {
          headers: { Authorization: token },
        });

      
      console.log("Dúvidas carregadas:", duvidas);
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
  }, [token, handleLogout]); 


useEffect(() => {
  if (isAuthenticated) { 
    
    buscarDuvidasCallback();
  } else if(!user && window.location.pathname !== '/login' && window.location.pathname !== '/cadastrar') {
      
      
  }
  
  
}, [token, buscarDuvidasCallback, user]); 

 
  
  const handleNovaDuvidaAdicionada = () => {
    console.log("Nova dúvida foi postada, atualizando a lista...");
    buscarDuvidasCallback(); 
  };

  

  if (isLoading && duvidas.length === 0) { 
    (
      <div className="flex justify-center items-center min-h-[60vh]">
       
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {user && ( 
        <div className="mb-6 text-right">
          {/* Passa a função de callback para o Modal */}
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