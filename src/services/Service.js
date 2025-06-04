
import api from '../api/axios'; 




// export const buscar = async (url, setData, config) => {
//   try {
//     const resposta = await api.get(url, config);
//     setData(resposta.data);
//   } catch (error) {
//     console.error(`Erro ao buscar dados de ${url}:`, error);
//     throw error;
//   }
// };

// export const cadastrar = async (url, dados, setData, config) => {
//   try {
//     const resposta = await api.post(url, dados, config);
//     if (setData) setData(resposta.data); // Chama setData se fornecido
//     return resposta.data; // Retorna os dados também, para flexibilidade
//   } catch (error) {
//     console.error(`Erro ao cadastrar dados em ${url}:`, error);
//     throw error;
//   }
// };


// export const atualizar = async (url, dados, setData, config) => {
//   try {
//     const resposta = await api.put(url, dados, config);
//     if (setData) setData(resposta.data); 
//     return resposta.data; 
//   } catch (error) {
//     console.error(`Erro ao atualizar dados em ${url}:`, error);
//     throw error;
//   }
// };


// export const deletar = async (url, config) => {
//   try {
//     await api.delete(url, config);
//    alert ("Deletado")
//   } catch (error) {
//     console.error(`Erro ao deletar recurso em ${url}:`, error);
//     throw error;
//   }
// };



// src/services/Service.js
// import api from '../api/axios'; // Comente se estiver usando apenas simulação para /duvidas

const CHAVE_STORAGE_DUVIDAS = 'minhas_duvidas_simuladas';

// Função para pegar as dúvidas do localStorage
const getDuvidasSimuladas = () => {
  const dados = localStorage.getItem(CHAVE_STORAGE_DUVIDAS);
  return dados ? JSON.parse(dados) : [
    // Adicione aqui seus dados iniciais se quiser, ou comece vazio
    { id: "mock-inicial-1", titulo: "Dúvida Inicial de Exemplo", descricao: "Esta é uma dúvida que vem do localStorage.", categoria: "Exemplo", usuarioId: "userExemplo", nomeUsuario: "ExemploUser", dataPostagem: new Date(Date.now() - 86400000).toISOString(), curtidas: 5, usuariosQueCurtiram: [], respostasCount: 1 },
  ];
};

// Função para salvar as dúvidas no localStorage
const setDuvidasSimuladas = (duvidas) => {
  localStorage.setItem(CHAVE_STORAGE_DUVIDAS, JSON.stringify(duvidas));
};

export const buscar = async (url, setData, config) => {
  console.log(`[SIMULADO COM LOCALSTORAGE] Buscando dados de: ${url}`);
  try {
    let dadosAServir = [];
    if (url.startsWith('/duvidas/')) {
      const id = url.split('/').pop();
      const todasDuvidas = getDuvidasSimuladas();
      const duvidaEncontrada = todasDuvidas.find(d => d.id === id);
      if (duvidaEncontrada) {
        dadosAServir = duvidaEncontrada;
      } else {
        throw new Error('404 - Dúvida não encontrada na simulação');
      }
    } else if (url === '/duvidas') {
      dadosAServir = getDuvidasSimuladas().sort((a, b) => new Date(b.dataPostagem) - new Date(a.dataPostagem));
    } else {
      console.warn(`[SIMULADO] Rota de busca não totalmente simulada para ${url}`);
    }
    // Simula delay da API
    setTimeout(() => {
      console.log("[SIMULADO COM LOCALSTORAGE] Dados servidos para busca:", dadosAServir);
      setData(dadosAServir);
    }, 300);
  } catch (error) {
    console.error(`[SIMULADO] Erro ao buscar dados de ${url}:`, error);
    throw error; // Re-lança para o componente tratar
  }
};

export const cadastrar = async (url, dadosNovos, setDataCallback, config) => {
  console.log(`[SIMULADO COM LOCALSTORAGE] Cadastrando dados em ${url}:`, dadosNovos);
  return new Promise((resolve) => {
    setTimeout(() => {
      let duvidasAtuais = getDuvidasSimuladas();
      const novaDuvida = {
        ...dadosNovos,
        id: `mock-${Date.now()}`, // Gera um ID mockado
        dataPostagem: dadosNovos.dataPostagem || new Date().toISOString(),
        curtidas: 0,
        usuariosQueCurtiram: [],
        respostasCount: 0,
        // Garanta que `usuario` seja tratado corretamente (pode vir como objeto ou IDs)
        // Se dadosNovos.usuario é um objeto {id: ...}, está ok.
        // Se o backend espera usuarioId, nomeUsuario, etc., ajuste aqui ou no Formulario.
      };
      duvidasAtuais = [novaDuvida, ...duvidasAtuais]; // Adiciona no início
      setDuvidasSimuladas(duvidasAtuais);
      if (setDataCallback) setDataCallback(novaDuvida); // Callback com a nova dúvida criada
      console.log("[SIMULADO COM LOCALSTORAGE] Dúvidas após cadastro:", getDuvidasSimuladas());
      resolve({ data: novaDuvida }); // Simula a estrutura de resposta do Axios
    }, 300);
  });
};

export const atualizar = async (url, dadosAtualizados, setDataCallback, config) => {
  // url ex: /duvidas/mock123
  console.log(`[SIMULADO COM LOCALSTORAGE] Atualizando dados em ${url}:`, dadosAtualizados);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let duvidasAtuais = getDuvidasSimuladas();
      const idParaAtualizar = url.split('/').pop(); // Assume que o ID está no final da URL
      const index = duvidasAtuais.findIndex(d => d.id === idParaAtualizar);
      if (index !== -1) {
        duvidasAtuais[index] = { 
            ...duvidasAtuais[index], 
            ...dadosAtualizados, 
            dataUltimaEdicao: new Date().toISOString() 
        };
        setDuvidasSimuladas(duvidasAtuais);
        const duvidaAtualizada = duvidasAtuais[index];
        if (setDataCallback) setDataCallback(duvidaAtualizada);
        console.log("[SIMULADO COM LOCALSTORAGE] Dúvida atualizada:", duvidaAtualizada);
        resolve({ data: duvidaAtualizada });
      } else {
        reject(new Error('404 - Dúvida não encontrada para atualização na simulação'));
      }
    }, 300);
  });
};

export const deletar = async (url, config) => {
  console.log(`[SIMULADO COM LOCALSTORAGE] Deletando recurso em ${url}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let duvidasAtuais = getDuvidasSimuladas();
      const idParaDeletar = url.split('/').pop();
      const tamanhoOriginal = duvidasAtuais.length;
      duvidasAtuais = duvidasAtuais.filter(d => d.id !== idParaDeletar);
      if (duvidasAtuais.length < tamanhoOriginal) {
        setDuvidasSimuladas(duvidasAtuais);
        console.log("[SIMULADO COM LOCALSTORAGE] Dúvida deletada. Dúvidas atuais:", getDuvidasSimuladas());
        resolve({ status: 200 });
      } else {
        reject(new Error('404 - Dúvida não encontrada para deleção na simulação'));
      }
    }, 300);
  });
};