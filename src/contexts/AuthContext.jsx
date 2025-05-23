import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_URL_API;

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            axios
                .get(`${API_URL}/auth/verify`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(res => setUser(res.data))
                .catch(() => {
                  setUser(null);
                  localStorage.removeItem('token');
                });
        }
    }, []);

    const login = async({username, password, role}) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { username, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setUser(user);

            if(role === 'admin') {
                navigate('/admin');
            } else if(role === 'user') {
                navigate('/');
            } else {
                toast.error('Invalid credentials');
                setUser(null);
                navigate('/login');
            }
        } catch (error) {
            toast.error('Invalid credentials');
            setUser(null);
            navigate('/login');
        }
    };

    // Função para cadastrar usuário novo
    const register = async({ nome, username, password }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, {
                nome,
                username,
                password
            });

            toast.success('Cadastro realizado com sucesso! Faça login para continuar.');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erro ao cadastrar usuário.');
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
