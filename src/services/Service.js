
// import api from '../api/axios'; 

// //  export const buscar = async (url, setData, config) => {
// //   try {
// //      const resposta = await api.get(url, config);
// //      setData(resposta.data);
// //   } catch (error) {
// //      console.error(`Erro ao buscar dados de ${url}:`, error);
// //      throw error;  
// //      }
// //  };
// export async function buscar(url, setData, config) {
//   try {
//     const resposta = await api.get(url, config);
//     const dados = resposta.data;

//     if (dados.questions) {
//       console.warn("Formato com 'questions' detectado:", dados);
//       setData(dados.questions);
//     } else if (Array.isArray(dados)) {
//       setData(dados);
//     } else {
//       console.warn("Formato inesperado de resposta:", dados);
//       setData([]);
//     }
//   } catch (error) {
//     console.error("Erro ao buscar dados:", error);
//     throw error;
//   }
// }

// // No Service.js ou ListaDuvida.jsx, após buscar os dados da API
// // async function buscarMinhasDuvidas() { // ou como se chama sua função
// //     try {
// //         // Supondo que 'respostaDaAPI' seja o dado bruto da API
// //         const respostaDaAPI = await api.get('/sua-url-de-duvidas', { headers: { Authorization: token } });
// //         console.log("Resposta completa da API em buscarMinhasDuvidas:", respostaDaAPI.data); // Veja o que a API realmente retorna

// //         // Verifique se a resposta tem a propriedade 'questions' e se ela é um array
// //         if (respostaDaAPI.data && Array.isArray(respostaDaAPI.data.questions)) {
// //             setDuvidas(respostaDaAPI.data.questions); // Defina APENAS o array de dúvidas no estado
// //             console.log("Dúvidas carregadas (extraídas com sucesso):", respostaDaAPI.data.questions);
// //         } else if (Array.isArray(respostaDaAPI.data)) {
// //             // Caso a API às vezes retorne diretamente um array
// //             setDuvidas(respostaDaAPI.data);
// //             console.log("Dúvidas carregadas (array direto da API):", respostaDaAPI.data);
// //         } else {
// //             console.warn("Formato de resposta inesperado da API de dúvidas:", respostaDaAPI.data);
// //             setDuvidas([]); // Defina como array vazio se o formato for desconhecido
// //         }
// //     } catch (error) {
// //         // ... seu tratamento de erro ...
// //         console.error("Erro ao buscar dúvidas:", error);
// //         setDuvidas([]); // Também defina como vazio em caso de erro, se apropriado
// //     }
// //}

//  export const cadastrar = async (url, dados, setData, config) => {
//    try {
//      const resposta = await api.post(url, dados, config);
//      if (setData) setData(resposta.data); // Chama setData se fornecido
//     return resposta.data; // Retorna os dados também, para flexibilidade
//    } catch (error) {
//      console.error(`Erro ao cadastrar dados em ${url}:`, error);
//      throw error;
//    }
//  };

//  export const atualizar = async (url, dados, setData, config) => {
//    try {
//      const resposta = await api.put(url, dados, config);
//      if (setData) setData(resposta.data); 
//      return resposta.data; 
//    } catch (error) {
//      console.error(`Erro ao atualizar dados em ${url}:`, error);
//      throw error;   }
//  };

//  export const deletar = async (url, config) => {
//    try {
//      await api.delete(url, config);
//     alert ("Deletado")
//   } catch (error) {
//      console.error(`Erro ao deletar recurso em ${url}:`, error);
//      throw error;
//    }
//  };



// // src/services/Service.js
// // import api from '../api/axios'; // Comente se estiver usando apenas simulação para /duvidas

// // const CHAVE_STORAGE_DUVIDAS = 'minhas_duvidas_simuladas';

// // // Função para pegar as dúvidas do localStorage
// // const getDuvidasSimuladas = () => {
// //   const dados = localStorage.getItem(CHAVE_STORAGE_DUVIDAS);
// //   return dados ? JSON.parse(dados) : [
// //     // Adicione aqui seus dados iniciais se quiser, ou comece vazio
// //     { id: "mock-inicial-1", titulo: "Dúvida Inicial de Exemplo", descricao: "Esta é uma dúvida que vem do localStorage.", categoria: "Exemplo", usuarioId: "userExemplo", nomeUsuario: "ExemploUser", dataPostagem: new Date(Date.now() - 86400000).toISOString(), curtidas: 5, usuariosQueCurtiram: [], respostasCount: 1 },
// //   ];
// // };

// // // Função para salvar as dúvidas no localStorage
// // const setDuvidasSimuladas = (duvidas) => {
// //   localStorage.setItem(CHAVE_STORAGE_DUVIDAS, JSON.stringify(duvidas));
// // };

// // export const buscar = async (url, setData, config) => {
// //   console.log(`[SIMULADO COM LOCALSTORAGE] Buscando dados de: ${url}`);
// //   try {
// //     let dadosAServir = [];
// //     if (url.startsWith('/duvidas/')) {
// //       const id = url.split('/').pop();
// //       const todasDuvidas = getDuvidasSimuladas();
// //       const duvidaEncontrada = todasDuvidas.find(d => d.id === id);
// //       if (duvidaEncontrada) {
// //         dadosAServir = duvidaEncontrada;
// //       } else {
// //         throw new Error('404 - Dúvida não encontrada na simulação');
// //       }
// //     } else if (url === '/duvidas') {
// //       dadosAServir = getDuvidasSimuladas().sort((a, b) => new Date(b.dataPostagem) - new Date(a.dataPostagem));
// //     } else {
// //       console.warn(`[SIMULADO] Rota de busca não totalmente simulada para ${url}`);
// //     }
// //     // Simula delay da API
// //     setTimeout(() => {
// //       console.log("[SIMULADO COM LOCALSTORAGE] Dados servidos para busca:", dadosAServir);
// //       setData(dadosAServir);
// //     }, 300);
// //   } catch (error) {
// //     console.error(`[SIMULADO] Erro ao buscar dados de ${url}:`, error);
// //     throw error; // Re-lança para o componente tratar
// //   }
// // };

// // export const cadastrar = async (url, dadosNovos, setDataCallback, config) => {
// //   console.log(`[SIMULADO COM LOCALSTORAGE] Cadastrando dados em ${url}:`, dadosNovos);
// //   return new Promise((resolve) => {
// //     setTimeout(() => {
// //       let duvidasAtuais = getDuvidasSimuladas();
// //       const novaDuvida = {
// //         ...dadosNovos,
// //         id: `mock-${Date.now()}`, // Gera um ID mockado
// //         dataPostagem: dadosNovos.dataPostagem || new Date().toISOString(),
// //         curtidas: 0,
// //         usuariosQueCurtiram: [],
// //         respostasCount: 0,
// //         // Garanta que `usuario` seja tratado corretamente (pode vir como objeto ou IDs)
// //         // Se dadosNovos.usuario é um objeto {id: ...}, está ok.
// //         // Se o backend espera usuarioId, nomeUsuario, etc., ajuste aqui ou no Formulario.
// //       };
// //       duvidasAtuais = [novaDuvida, ...duvidasAtuais]; // Adiciona no início
// //       setDuvidasSimuladas(duvidasAtuais);
// //       if (setDataCallback) setDataCallback(novaDuvida); // Callback com a nova dúvida criada
// //       console.log("[SIMULADO COM LOCALSTORAGE] Dúvidas após cadastro:", getDuvidasSimuladas());
// //       resolve({ data: novaDuvida }); // Simula a estrutura de resposta do Axios
// //     }, 300);
// //   });
// // };

// // export const atualizar = async (url, dadosAtualizados, setDataCallback, config) => {
// //   // url ex: /duvidas/mock123
// //   console.log(`[SIMULADO COM LOCALSTORAGE] Atualizando dados em ${url}:`, dadosAtualizados);
// //   return new Promise((resolve, reject) => {
// //     setTimeout(() => {
// //       let duvidasAtuais = getDuvidasSimuladas();
// //       const idParaAtualizar = url.split('/').pop(); // Assume que o ID está no final da URL
// //       const index = duvidasAtuais.findIndex(d => d.id === idParaAtualizar);
// //       if (index !== -1) {
// //         duvidasAtuais[index] = { 
// //             ...duvidasAtuais[index], 
// //             ...dadosAtualizados, 
// //             dataUltimaEdicao: new Date().toISOString() 
// //         };
// //         setDuvidasSimuladas(duvidasAtuais);
// //         const duvidaAtualizada = duvidasAtuais[index];
// //         if (setDataCallback) setDataCallback(duvidaAtualizada);
// //         console.log("[SIMULADO COM LOCALSTORAGE] Dúvida atualizada:", duvidaAtualizada);
// //         resolve({ data: duvidaAtualizada });
// //       } else {
// //         reject(new Error('404 - Dúvida não encontrada para atualização na simulação'));
// //       }
// //     }, 300);
// //   });
// // };

// // export const deletar = async (url, config) => {
// //   console.log(`[SIMULADO COM LOCALSTORAGE] Deletando recurso em ${url}`);
// //   return new Promise((resolve, reject) => {
// //     setTimeout(() => {
// //       let duvidasAtuais = getDuvidasSimuladas();
// //       const idParaDeletar = url.split('/').pop();
// //       const tamanhoOriginal = duvidasAtuais.length;
// //       duvidasAtuais = duvidasAtuais.filter(d => d.id !== idParaDeletar);
// //       if (duvidasAtuais.length < tamanhoOriginal) {
// //         setDuvidasSimuladas(duvidasAtuais);
// //         console.log("[SIMULADO COM LOCALSTORAGE] Dúvida deletada. Dúvidas atuais:", getDuvidasSimuladas());
// //         resolve({ status: 200 });
// //       } else {
// //         reject(new Error('404 - Dúvida não encontrada para deleção na simulação'));
// //       }
// //     }, 300);
// //   });
// // };

// src/services/Service.js
import api from '../api/axios';

/**
 * Busca dados da API.
 * @param {string} url - A URL do endpoint (ex: /categories).
 * @param {Function} setData - A função de state para guardar os dados.
 * @param {object} header - Os cabeçalhos da requisição.
 */
export const buscar = async (url, setData, header) => {
    const resposta = await api.get(url, header);
    setData(resposta.data);
};

/**
 * Cadastra um novo item na API.
 * @param {string} url - A URL do endpoint.
 * @param {object} dados - O corpo da requisição.
 * @param {Function} setData - A função de state para o resultado.
 * @param {object} header - Os cabeçalhos da requisição.
 */
export const cadastrar = async (url, dados, setData, header) => {
    const resposta = await api.post(url, dados, header);
    setData(resposta.data);
};

/**
 * Atualiza um item na API.
 * @param {string} url - A URL do endpoint.
 * @param {object} dados - O corpo da requisição.
 * @param {Function} setData - A função de state para o resultado.
 * @param {object} header - Os cabeçalhos da requisição.
 */
export const atualizar = async (url, dados, setData, header) => {
    const resposta = await api.put(url, dados, header);
    setData(resposta.data);
};

/**
 * Deleta um item da API.
 * @param {string} url - A URL do endpoint (ex: /categories/123).
 * @param {object} header - Os cabeçalhos da requisição.
 */
export const deletar = async (url, header) => {
    await api.delete(url, header);
};