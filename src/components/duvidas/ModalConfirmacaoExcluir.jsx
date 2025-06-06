import React from 'react';

function ModalConfirmacaoExcluir({ isOpen, onClose, onConfirm, itemName = "item" }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md transform transition-all">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center">
          Deseja Excluir?
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 text-center">
          Você realmente deseja excluir {itemName === "dúvida" || itemName === "resposta" ? `esta ${itemName}` : `este ${itemName}`}? Esta ação não poderá ser desfeita.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Sim, Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacaoExcluir;