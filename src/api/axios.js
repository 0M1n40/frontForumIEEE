// src/api/axios.js
import axios from 'axios';

// Cria uma instância do axios com a URL base definida na variável de ambiente
const api = axios.create({
  baseURL: import.meta.env.VITE_URL_API, // URL base para todas as requisições
  headers: {
    'Content-Type': 'application/json', // Define o tipo de conteúdo das requisições
    Accept: 'application/json',         // Define o tipo de conteúdo aceito nas respostas
  },
  timeout: 7000 // Tempo máximo de espera para uma requisição (em milissegundos)
});

// Interceptor de requisição: Adiciona o token de autenticação a cada requisição, se disponível
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('user_token'); // Pega o token do localStorage

    if (token) {
      // Se o token existir, adiciona ao cabeçalho de autorização
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Retorna a configuração da requisição (com ou sem token)
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const login = async (url, dados) => {
  const resposta = await api.post(url, dados); // Faz a requisição POST para o endpoint de login
  return resposta.data; // Retorna os dados da resposta (geralmente { user, token })
};


export const register = async (url, dados) => {
  const resposta = await api.post(url, dados); // Faz a requisição POST para o endpoint de registro
  return resposta.data; // Retorna os dados da resposta
};

export default api;