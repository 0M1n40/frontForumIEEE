// src/components/duvidas/ModalNovaDuvida.jsx
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FormularioNovaDuvida from './FormularioNovaDuvida';
import { PlusIcon } from '@heroicons/react/24/outline';

// Recebe onDuvidaSalvaComSucesso do componente pai (ListaDuvidas)
function ModalNovaDuvida({ onDuvidaSalvaComSucesso }) {
  return (
    <Popup
      trigger={
        <button 
          className="bg-[#0D334D] text-white px-5 py-2.5 rounded-lg shadow hover:bg-opacity-90 transition-colors font-medium flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Nova Dúvida
        </button>
      }
      modal
      nested
      // closeOnDocumentClick={false} // Para forçar o uso dos botões do formulário para fechar
    >
      {closePopup => ( // 'closePopup' é a função do reactjs-popup para fechar o modal
        <div className="modal-content-wrapper p-0 bg-transparent"> {/* Ajuste o padding se o form já tiver */}
          <FormularioNovaDuvida
            onCancelar={closePopup} // O botão "Cancelar" do formulário chamará closePopup
            onSucesso={() => {      // O formulário chamará isso após um cadastro/edição bem-sucedido
              if (onDuvidaSalvaComSucesso) {
                onDuvidaSalvaComSucesso(); // Notifica o ListaDuvidas para atualizar
              }
              // O FormularioNovaDuvida já chama seu 'onCancelar' (que é closePopup aqui) após o sucesso.
              // Então não precisamos chamar closePopup() aqui novamente, a menos que o form não o faça.
              // No entanto, para garantir que feche, podemos adicionar:
              // closePopup(); // Garante que o modal feche após o sucesso.
            }}
          />
        </div>
      )}
    </Popup>
  );
}

export default ModalNovaDuvida;