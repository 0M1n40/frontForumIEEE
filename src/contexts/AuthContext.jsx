// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin, register as apiRegister } from "../api/axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 1. Importe a instância do Axios
import api from '../api/axios'; 

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    // 2. Defina TODOS os estados necessários
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('user_token');
        const storedUser = localStorage.getItem('user_data');

        if (storedToken && storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                setUser(userData);
                setToken(storedToken);
                setIsAuthenticated(true); // Marca como autenticado
                api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
            } catch (error) {
                console.error("Falha ao processar dados do localStorage", error);
                handleLogout(); // Limpa tudo se os dados estiverem corrompidos
            }
        }
        setIsLoading(false);
    }, []);

    const handleLogin = async (dadosLogin) => {
        setIsLoading(true);
        try {
            console.log("Tentando logar com:", dadosLogin);
            const resposta = await apiLogin('/auth/login', dadosLogin);

            if (resposta.token && resposta.user) {
                setUser(resposta.user);
                setToken(resposta.token);
                setIsAuthenticated(true); // Esta chamada agora vai funcionar
                localStorage.setItem('user_token', resposta.token);
                localStorage.setItem('user_data', JSON.stringify(resposta.user));
                api.defaults.headers.common['Authorization'] = `Bearer ${resposta.token}`;

                // 3. Padronize para usar toast
                toast.success('Login realizado com sucesso!');
                navigate('/'); 
            } else {
                toast.info('Resposta inesperada do servidor.');
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                // 3. Padronize para usar toast
                toast.error(data.error || `Erro ${status} no servidor.`);
            } else {
                toast.error('Não foi possível conectar ao servidor.');
            }
            toast.error('Falha ao realizar login. Verifique suas credenciais.');
            console.error("Erro detalhado no login:", error); 
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (registerData) => {
        // ... sua função de registro está boa, sem necessidade de alteração
        setIsLoading(true);
        try {
            await apiRegister('/auth/cadastro', registerData);
            toast.success('Cadastro realizado com sucesso! Faça login para continuar.');
            navigate('/login');
        } catch (error) {
            console.error("Erro no cadastro:", error);
            const errorMessage = error.response?.data?.error || "Erro ao tentar realizar o cadastro.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        setUser(null);
        setToken('');
        setIsAuthenticated(false); // Garante que o estado seja atualizado
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_data');
        delete api.defaults.headers.common['Authorization'];
        
        console.log("Usuário desconectado com sucesso.");
        toast.info('Você foi desconectado.');
        navigate('/');
    };

    // 4. Disponibilize TODOS os valores necessários no Provider
    const authContextValue = { 
        user, 
        isAuthenticated, 
        isLoading, 
        handleLogin, 
        handleRegister, 
        handleLogout 
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    // 1. Pega o contexto
    const context = useContext(AuthContext);

    // 2. VERIFICA SE O CONTEXTO EXISTE
    if (context === undefined) {
        // 3. Se não existir, lança um erro claro e específico
        throw new Error('O hook useAuth deve ser usado dentro de um AuthProvider');
    }

    // 4. Se existir, retorna o contexto normalmente
    return context;
};

