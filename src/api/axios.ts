import axios from 'axios';
import type { LoginData, RegisterData } from '../types';

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    'Content-Type': 'application/json', 
    Accept: 'application/json',
  },
  withCredentials: true,
  timeout: 7000 
});

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

api.interceptors.request.use(
  (config) => {
    if(accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {

    if(error.response.status !== 401) {
      const { accessToken: newToken } = await refreshToken()
      setAccessToken(newToken)

      if(newToken){
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api.request(error.config);
      }
    }
    return Promise.reject(error);
  }
)

export const login = async (data: LoginData) => {

  const response = await api.post('/auth/login', data);
  
  if(!response.data.accessToken){
    throw new Error('no access token in response');
  }

  const responseData = response.data
  return { 
    accessToken: responseData.accessToken, 
    user: responseData.user 
  }
}

export const refreshToken = async () => {
  const response = await api.post('/auth/refresh', {});

  if(!response.data.accessToken){
    throw new Error('no access token in response');
  }

  const responseData = response.data
  return { 
    accessToken: responseData.accessToken, 
    user: responseData.user 
  }
}

export const register = async (data: RegisterData) => {
  const resposta = await api.post('/auth/register',data);
  return resposta.data;
};

export const logout = async () => {
  await api.post('/auth/logout', {});
  accessToken = null;
}

export default api;