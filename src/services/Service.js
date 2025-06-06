import api from '../api/axios';

// Funções de serviço robustas com 'setData' opcional

export const buscar = async (url, setData, header) => {
    const resposta = await api.get(url, header);
    if (setData && typeof setData === 'function') {
        setData(resposta.data);
    }
    return resposta.data;
};

export const cadastrar = async (url, dados, setData, header) => {
    const resposta = await api.post(url, dados, header);
    // Só chama setData se ela for uma função válida
    if (setData && typeof setData === 'function') {
        setData(resposta.data);
    }
    return resposta.data;
};

export const atualizar = async (url, dados, setData, header) => {
    const resposta = await api.put(url, dados, header);
    if (setData && typeof setData === 'function') {
        setData(resposta.data);
    }
    return resposta.data;
};

export const deletar = async (url, header) => {
    await api.delete(url, header);
};