
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FormularioNovaDuvida from './FormularioNovaDuvida';
import { PlusIcon } from '@heroicons/react/24/outline';


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
      {closePopup => (
        <div className="modal-content-wrapper p-2 bg-transparent">
          <FormularioNovaDuvida
            onCancelar={'closePopup'} // O botão "Cancelar" do formulário chamará closePopup
            onSucesso={() => {
              if (onDuvidaSalvaComSucesso) {
                onDuvidaSalvaComSucesso();
              }
              closePopup(); // Fecha o modal após salvar com sucesso
            }}
          />
        </div>
      )}
    </Popup>
  );
}

export default ModalNovaDuvida;