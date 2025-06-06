import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { buscar, cadastrar, atualizar } from '../../services/Service';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';

function FormularioNovaDuvida() {
    // --- HOOKS E ESTADOS ---
    const navigate = useNavigate();
    const { id } = useParams(); // Pega o ID da URL para o modo de edição

    const { user, isAuthenticated, isLoading: isAuthLoading, handleLogout } = useAuth();

    // Estados de controle do formulário
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const [validationError, setValidationError] = useState('');

    const [formData, setFormData] = useState({
        titulo: '',
        categoriaId: '', // Usando 'categoriaId' para clareza
        descricao: '',
    });

    // Estados para o dropdown de categorias
    const [categoriasDisponiveis, setCategoriasDisponiveis] = useState([]);
    const [isLoadingCategorias, setIsLoadingCategorias] = useState(false);

    // --- LÓGICA DE AUTENTICAÇÃO E BUSCA DE DADOS ---

    // Efeito para verificar se o usuário está logado
    useEffect(() => {
        if (!isAuthLoading && !isAuthenticated) {
            toast.info('Você precisa estar logado para acessar esta funcionalidade.');
            navigate('/login');
        }
    }, [isAuthLoading, isAuthenticated, navigate]);

    // Efeito para buscar as categorias disponíveis para o dropdown
    useEffect(() => {
        if (isAuthenticated) {
            const fetchCategorias = async () => {
                setIsLoadingCategorias(true);
                try {
                    await buscar('/categories', setCategoriasDisponiveis);
                } catch (error) {
                    toast.error('Falha ao carregar as categorias.');
                    console.error("Erro ao buscar categorias:", error);
                } finally {
                    setIsLoadingCategorias(false);
                }
            };
            fetchCategorias();
        }
    }, [isAuthenticated]);

  

    // --- FUNÇÕES DE MANIPULAÇÃO DO FORMULÁRIO ---

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setValidationError('');
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setValidationError('');
    setApiError('');

    if (!formData.titulo.trim() || !formData.categoriaId || !formData.descricao.trim()) {
        toast.error('Todos os campos são obrigatórios.');
        setIsLoading(false);
        return;
    }

    // Objeto para enviar ao backend com a correção aplicada
    const payloadParaBackend = {
        title: formData.titulo,
        content: formData.descricao,
        categoryId: formData.categoriaId, // Sem o parseInt()
    };

    console.log("Enviando para o backend:", payloadParaBackend);

    try {
        if (id) { // Modo Edição
            await atualizar(`/duvidas/${id}`, payloadParaBackend);
            toast.success('Dúvida atualizada com sucesso!');
        } else { // Modo Cadastro
            await cadastrar('/duvidas', payloadParaBackend);
            toast.success('Dúvida cadastrada com sucesso!');
        }
        navigate('/duvidas'); // Redireciona para a lista de dúvidas
    } catch (error) {
        const errorMsg = error.response?.data?.message || 'Erro ao salvar a dúvida.';
        console.error("Erro ao salvar dúvida:", error);
        setApiError(errorMsg);
        toast.error(errorMsg);
    } finally {
        setIsLoading(false);
    }
};

    // --- RENDERIZAÇÃO DO COMPONENTE ---

    if (isAuthLoading) {
        return <div className="flex justify-center items-center p-8"><RotatingLines /></div>;
    }

    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-2xl mx-auto my-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0D334D] mb-6 text-center">
                {id ? 'Editar Dúvida' : 'Qual sua dúvida?'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                    <input
                        type="text"
                        name="titulo"
                        id="titulo"
                        placeholder="Título conciso para sua dúvida"
                        value={formData.titulo}
                        onChange={handleInputChange}
                        required
                        maxLength={100}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D334D]"
                    />
                    <p className="text-xs text-gray-500 text-right mt-1">{formData.titulo.length}/100</p>
                </div>
                
                <div>
                    <label htmlFor="categoriaId" className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                    <select
                        name="categoriaId"
                        id="categoriaId"
                        value={formData.categoriaId}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D334D]"
                    >
                        <option value="" disabled>
                            {isLoadingCategorias ? "Carregando categorias..." : (categoriasDisponiveis.length === 0 ? "Nenhuma categoria encontrada" : "Selecione uma categoria")}
                        </option>
                        {categoriasDisponiveis.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.description}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-start">
                    <Link to="/nova-categoria" className="bg-[#0D334D] p-2 rounded-[5px] text-sm text-white no-underline hover:bg-opacity-90">
                        Cadastrar Nova Categoria
                    </Link>
                </div>

                <div>
                    <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">Descrição Detalhada</label>
                    <textarea
                        name="descricao"
                        id="descricao"
                        placeholder="Descreva sua dúvida em detalhes, incluindo o que você já tentou."
                        value={formData.descricao}
                        onChange={handleInputChange}
                        rows="6"
                        required
                        maxLength={1000}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D334D] resize-y"
                    ></textarea>
                    <p className="text-xs text-gray-500 text-right mt-1">{formData.descricao.length}/1000</p>
                </div>

                {validationError && <p className="text-sm text-red-600">{validationError}</p>}
                {apiError && <p className="text-sm text-red-600">{apiError}</p>}

                <div className="flex flex-col sm:flex-row justify-end items-center mt-8 space-y-3 sm:space-y-0 sm:space-x-3">
                    <button
                        type="button"
                        onClick={() => navigate(-1)} // Botão Cancelar simplesmente volta para a página anterior
                        disabled={isLoading}
                        className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading || isLoadingCategorias}
                        className="w-full sm:w-auto px-6 py-2.5 bg-[#0D334D] text-white rounded-lg hover:bg-opacity-90 font-medium flex items-center justify-center min-w-[160px] disabled:opacity-70"
                    >
                        {isLoading ? (
                            <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} />
                        ) : (id ? 'Salvar Alterações' : 'Enviar Dúvida')}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormularioNovaDuvida;