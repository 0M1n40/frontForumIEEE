import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { atualizar } from '../../services/Service';
import { toast } from 'react-toastify';

function EditarNomeModal({ onClose }) {
    const { user, updateUserData } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState(user.name || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {

            const updatedUser = await atualizar('/conta/perfil/nome', { name });

            updateUserData(updatedUser);

            toast.success('Nome atualizado com sucesso!');
            onClose(); // Fecha o modal
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erro ao atualizar o nome.');
            console.error('Erro ao atualizar o nome:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h3 className="text-2xl font-bold mb-4 text-center">Editar Nome</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-gray-700">Nome</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder='Digite seu nome'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 rounded border">Cancelar</button>
                        <button type="submit" disabled={isLoading} className="py-2 px-4 rounded  bg-[#0D334D] text-white hover:bg-blue-900">
                            {isLoading ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditarNomeModal;