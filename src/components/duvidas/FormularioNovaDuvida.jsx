// src/components/duvidas/FormularioNovaDuvida.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // Certifique-se que o caminho está correto
import { Link, useNavigate, useParams } from 'react-router-dom';
import { buscar, cadastrar, atualizar } from '../../services/Service'; // Certifique-se que o caminho está correto
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';

function FormularioNovaDuvida({ onCancelar, onSucesso, duvidaIdParaEditar }) {
    const navigate = useNavigate();
    const { id: routeId } = useParams();
    const id = duvidaIdParaEditar || routeId;

    const { user, isAuthenticated, isLoading: isAuthLoading, handleLogout } = useAuth(); // Alterado para useAuth, se for o nome do seu hook
    const token = user?.token;

    const [isLoading, setIsLoading] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const [validationError, setValidationError] = useState('');

    const [formData, setFormData] = useState({
        titulo: '',
        categoria: '', // Armazena o ID da categoria selecionada
        descricao: '',
    });

    const MAX_TITULO_LENGTH = 100;
    // MAX_CATEGORIA_LENGTH não é relevante para um ID numérico de select
    const MAX_DESCRICAO_LENGTH = 1000;
    
    const [categoriasDisponiveis, setCategoriasDisponiveis] = useState([]);
    const [isLoadingCategorias, setIsLoadingCategorias] = useState(false); // Estado de loading para categorias

    // Efeito para verificar se o usuário está logado
    // CORREÇÃO:
useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
        toast.info('Você precisa estar logado para acessar esta funcionalidade.');
        navigate('/login');
    }
}, [isAuthLoading, isAuthenticated, navigate]); // Dependências corretas

    // Efeito para buscar as categorias disponíveis
    useEffect(() => {
        if (!token) return; // Não buscar se não houver token

        const fetchCategorias = async () => {
            setIsLoadingCategorias(true);
            try {
                // Assumindo que sua API de categorias está em '/categorias'
                // e Service.js/buscar lida com a extração dos dados (ex: response.data ou response.data.categories)
                await buscar('/categorias', (dadosDaApi) => {
                    // Verifique a estrutura de 'dadosDaApi'. Pode ser um array direto ou um objeto com um array dentro.
                    // Ex: se a API retorna { categories: [...] }, então use dadosDaApi.categories
                    // Se retorna [{id:1, name:'JS'}, ...], então use dadosDaApi
                    // No seu backend, a rota GET /categories retorna um array de objetos { id, name, description }
                    if (Array.isArray(dadosDaApi)) {
                        setCategoriasDisponiveis(dadosDaApi);
                    } else if (dadosDaApi && Array.isArray(dadosDaApi.categories)) { // Exemplo alternativo
                        setCategoriasDisponiveis(dadosDaApi.categories);
                    } else {
                         console.warn("Resposta inesperada da API de categorias:", dadosDaApi);
                        setCategoriasDisponiveis([]);
                    }
                }
                //, { headers: { Authorization: token } } // Se Service.js não tiver interceptor global
                );
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
                setApiError('Falha ao carregar categorias. Tente recarregar a página.');
                 if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    handleLogout();
                }
            } finally {
                setIsLoadingCategorias(false);
            }
        };

        fetchCategorias();
    }, [token, handleLogout]); // Adicionado handleLogout por causa do if de erro 401/403

    // Função para buscar os dados de uma dúvida (para edição)
    const buscarDuvidaPorId = useCallback(async (duvidaId) => {
        if (!token) return;
        setIsDataLoading(true);
        setApiError('');
        try {
            await buscar(`/duvidas/${duvidaId}`, (dadosDaApi) => {
                const questionData = dadosDaApi.question || dadosDaApi;
                setFormData({
                    titulo: questionData.title || '',
                    // Backend retorna category_id, frontend usa 'categoria' para o ID
                    categoria: questionData.category_id || questionData.categoria || '',
                    descricao: questionData.content || questionData.descricao || '',
                });
            }
            // , { headers: { Authorization: token } }
            );
        } catch (error) {
            console.error("Erro ao buscar dúvida para edição:", error);
            setApiError('Falha ao carregar os dados da dúvida para edição.');
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                handleLogout();
            }
        } finally {
            setIsDataLoading(false);
        }
    }, [token, handleLogout]);

    // Efeito para carregar dados da dúvida se um 'id' (para edição) estiver presente
    useEffect(() => {
        if (id && token) {
            buscarDuvidaPorId(id);
        } else {
            setFormData({ titulo: '', categoria: '', descricao: '' });
        }
    }, [id, token, buscarDuvidaPorId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value;

        if (name === 'titulo') processedValue = value.slice(0, MAX_TITULO_LENGTH);
        // Não precisa de slice para 'categoria' se for um ID de select
        else if (name === 'descricao') processedValue = value.slice(0, MAX_DESCRICAO_LENGTH);

        setFormData({ ...formData, [name]: processedValue });
        setValidationError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError('');
        setApiError('');

        if (!formData.titulo.trim() || !String(formData.categoria).trim() || !formData.descricao.trim()) {
            setValidationError('Todos os campos (Título, Categoria, Descrição) devem ser preenchidos.');
            return;
        }
        
        // Validação adicional: Verificar se formData.categoria (que é o ID) é um número válido
        if (isNaN(parseInt(formData.categoria))) {
            setValidationError('Por favor, selecione uma categoria válida.');
            return;
        }

        setIsLoading(true);

        const payloadParaBackend = {
            title: formData.titulo,
            content: formData.descricao,
            categoryId: parseInt(formData.categoria), // Garante que o categoryId seja enviado como número
        };

        try {
            if (id) { // Modo Edição
                await atualizar(`/duvidas/${id}`, payloadParaBackend, () => {}, {
                    // headers: { Authorization: token }, // Se necessário
                });
                alert('Dúvida atualizada com sucesso!');
            } else { // Modo Cadastro
                await cadastrar('/duvidas', payloadParaBackend, (response) => {
                    console.log('Dúvida cadastrada:', response);
                }, {
                    // headers: { Authorization: token }, // Se necessário
                });
                alert('Dúvida cadastrada com sucesso!');
            }

            if (onSucesso) onSucesso();
            if (onCancelar) {
                onCancelar();
            } else if (!id) {
                setFormData({ titulo: '', categoria: '', descricao: '' });
            } else {
                navigate(-1); 
            }

        } catch (error) {
            console.error("Erro ao salvar dúvida:", error);
            const errorMsg = error.response?.data?.error || error.response?.data?.message || `Erro ao ${id ? 'atualizar' : 'cadastrar'} a dúvida.`;
            setApiError(errorMsg + " Verifique os dados e tente novamente.");
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                handleLogout();
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    if (isDataLoading && id) {
        return (
            <div className="flex justify-center items-center p-8">
                <RotatingLines strokeColor="#0D334D" width="50" />
                <p className="ml-2">Carregando dados da dúvida...</p>
            </div>
        );
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
                        maxLength={MAX_TITULO_LENGTH}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D334D]"
                    />
                    <p className="text-xs text-gray-500 text-right mt-1">{formData.titulo.length}/{MAX_TITULO_LENGTH}</p>
                </div>
                
                <div>
                    <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                    <select
                    
                        name="categoria"
                        id="categoria"
                        value={formData.categoria} // formData.categoria agora guardará o ID da categoria selecionada
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D334D]"
                    >
                        <option value="" disabled>
                            {isLoadingCategorias ? "Carregando categorias..." : (categoriasDisponiveis.length === 0 ? "Nenhuma categoria encontrada" : "Selecione uma categoria")}
                        </option>
                        {/* CORRIGIDO: Mapeia sobre categoriasDisponiveis */}
                        {Array.isArray(categoriasDisponiveis) && categoriasDisponiveis.map((cat) => (
                            <option key={cat.id} value={cat.id}> {/* O value do option é o ID */}
                                {cat.description} {/* O texto visível é o nome (ou cat.description, dependendo da sua API) */}
                            </option>
                        ))}
                    </select>
                     {/* Opcional: Adicionar mensagem se isLoadingCategorias e não há categorias ainda */}
                </div>

                
                    <button className="bg-[#0D334D] p-2  rounded-[5px] text-sm  mb-4">
                    <Link to="/categorias" className=" text-white">
              Cadastrar Categoria
            </Link>
            </button>

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
                        maxLength={MAX_DESCRICAO_LENGTH}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D334D] resize-y"
                    ></textarea>
                    <p className="text-xs text-gray-500 text-right mt-1">{formData.descricao.length}/{MAX_DESCRICAO_LENGTH}</p>
                </div>

                {validationError && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md my-2">{validationError}</p>}
                {apiError && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md my-2">{apiError}</p>}

                <div className="flex flex-col sm:flex-row justify-end items-center mt-8 space-y-3 sm:space-y-0 sm:space-x-3">
                    <button
                        type="button"
                        onClick={onCancelar || (() => navigate(-1))}
                        disabled={isLoading}
                        className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading || (isDataLoading && !!id)}
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