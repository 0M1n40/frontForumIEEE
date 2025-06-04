// src/components/duvidas/FormularioNovaDuvida.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { buscar, cadastrar, atualizar } from '../../services/Service';
import { RotatingLines } from 'react-loader-spinner';

// Adicionamos a prop onSucesso
function FormularioNovaDuvida({ onCancelar, onSucesso }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, handleLogout } = useAuth();
  const token = user?.token;

  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [validationError, setValidationError] = useState('');

  const [formData, setFormData] = useState({
    titulo: '',
    categoria: '',
    descricao: '',
  });

  // ... (MAX_LENGTHS, useEffect para token, useEffect para buscarDuvidaPorId, handleInputChange) ...
  // Essas partes permanecem como na versão anterior que te enviei.
  // Vou colar apenas o handleSubmit modificado e a parte do token check:

  useEffect(() => {
    if (token) {
      alert('Você precisa estar logado para acessar esta página.');
      navigate('/login');
    }
  }, [token, navigate]);

  const buscarDuvidaPorId = useCallback(async (duvidaId) => {
    setIsDataLoading(true);
    setApiError('');
    try {
      await buscar(`/duvidas/${duvidaId}`, (dadosDaApi) => {
        setFormData({
          titulo: dadosDaApi.titulo || '',
          categoria: dadosDaApi.categoria || '',
          descricao: dadosDaApi.descricao || '',
        });
      }, { headers: { Authorization: token } });
    } catch (error) {
      console.error("Erro ao buscar dúvida para edição:", error);
      setApiError('Falha ao carregar os dados da dúvida para edição.');
      if (error.toString().includes('401') || error.toString().includes('403')) handleLogout();
    } finally {
      setIsDataLoading(false);
    }
  }, [token, handleLogout]); // Adicione handleLogout aqui também

  useEffect(() => {
    if (id && token) {
      buscarDuvidaPorId(id);
    } else {
      setFormData({ titulo: '', categoria: '', descricao: '' });
    }
  }, [id, token, buscarDuvidaPorId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let truncatedValue = value;
    const MAX_TITULO_LENGTH = 100;
    const MAX_CATEGORIA_LENGTH = 50;
    const MAX_DESCRICAO_LENGTH = 1000;

    if (name === 'titulo') truncatedValue = value.slice(0, MAX_TITULO_LENGTH);
    else if (name === 'categoria') truncatedValue = value.slice(0, MAX_CATEGORIA_LENGTH);
    else if (name === 'descricao') truncatedValue = value.slice(0, MAX_DESCRICAO_LENGTH);
    
    setFormData({ ...formData, [name]: truncatedValue });
    setValidationError('');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');
    setApiError('');

    if (!formData.titulo.trim() || !formData.categoria.trim() || !formData.descricao.trim()) {
      setValidationError('Todos os campos obrigatórios (Título, Categoria, Descrição) devem ser preenchidos.');
      return;
    }
    setIsLoading(true);

    const payload = {
      ...formData,
      usuario: { id: user.id }, // Ajuste conforme sua API espera o usuário
      // Se sua API espera usuarioId e nomeUsuario diretamente:
      // usuarioId: user.id,
      // nomeUsuario: user.nome || "Usuário Anônimo",
    };

    if (!id) {
        payload.dataPostagem = new Date().toISOString();
    } else {
        payload.id = id; // Garante que o ID seja enviado para atualização
        payload.dataUltimaEdicao = new Date().toISOString();
    }

    try {
      if (id) { // Edição
        await atualizar(`/duvidas/${id}`, payload, () => {}, {
          headers: { Authorization: token },
        });
        alert('Dúvida atualizada com sucesso!');
      } else { // Cadastro
        await cadastrar('/duvidas', payload, () => {}, { // A função setData aqui é opcional se não for usar a resposta imediata
          headers: { Authorization: token },
        });
        alert('Dúvida cadastrada com sucesso!');
      }
      
      if (onSucesso) { // <<--- CHAMA O CALLBACK DE SUCESSO
        onSucesso();
      }

      if (onCancelar) { // onCancelar é usado para fechar o modal
        onCancelar(); 
      } else { // Fallback de navegação se não estiver em um modal com onCancelar
        navigate('/home'); 
      }

    } catch (error) {
      console.error("Erro ao salvar dúvida:", error);
      setApiError(`Erro ao ${id ? 'atualizar' : 'cadastrar'} a dúvida. Tente novamente.`);
      if (error.toString().includes('401') || error.toString().includes('403')) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // ... (JSX do formulário, MAX_LENGTHS, formatarData etc. como antes)
  // Cole o JSX do return da resposta anterior aqui, ele já tem os campos e botões corretos.
  // Apenas garanta que as funções e estados referenciados no JSX estejam definidas acima.
  // Para simplificar, vou repetir o JSX relevante do return:
  const MAX_TITULO_LENGTH = 100;
  const MAX_CATEGORIA_LENGTH = 50;
  const MAX_DESCRICAO_LENGTH = 1000;
  const formatarData = (isoString) => { /* ... sua função ... */ };
  if (isDataLoading) { /* ... seu spinner ... */ }


  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl mx-auto my-10">
      <h2 className="text-3xl font-bold text-[#0D334D] mb-6 text-center">
        {id ? 'Editar Dúvida' : 'Escreva sua dúvida'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input type="text" name="titulo" placeholder="Título da sua dúvida" value={formData.titulo} onChange={handleInputChange} required maxLength={MAX_TITULO_LENGTH} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D334D]" />
          <p className="text-xs text-gray-500 text-right mt-1">{formData.titulo.length}/{MAX_TITULO_LENGTH}</p>
        </div>
        <div>
          <input type="text" name="categoria" placeholder="Categoria (ex: React, JavaScript)" value={formData.categoria} onChange={handleInputChange} required maxLength={MAX_CATEGORIA_LENGTH} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D334D]" />
          <p className="text-xs text-gray-500 text-right mt-1">{formData.categoria.length}/{MAX_CATEGORIA_LENGTH}</p>
        </div>
        <div>
          <textarea name="descricao" placeholder="Descreva sua dúvida em detalhes..." value={formData.descricao} onChange={handleInputChange} rows="6" required maxLength={MAX_DESCRICAO_LENGTH} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D334D] resize-y"></textarea>
          <p className="text-xs text-gray-500 text-right mt-1">{formData.descricao.length}/{MAX_DESCRICAO_LENGTH}</p>
        </div>
        {validationError && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{validationError}</p>}
        {apiError && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{apiError}</p>}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">
            {/* Data de postagem ou data atual */}
          </span>
          <div className="space-x-3">
            <button type="button" onClick={onCancelar || (() => navigate(-1))} disabled={isLoading} className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium disabled:opacity-50">
              Cancelar
            </button>
            <button type="submit" disabled={isLoading} className="px-6 py-2.5 bg-[#0D334D] text-white rounded-lg hover:bg-opacity-90 font-medium flex items-center justify-center min-w-[150px] disabled:opacity-70">
              {isLoading ? <RotatingLines strokeColor="white" width="24" /> : (id ? 'Salvar Alterações' : 'Enviar Dúvida')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default FormularioNovaDuvida;