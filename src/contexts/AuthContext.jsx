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
                .then( res => setUser(res.data))
                .catch()
        }

    }, [])

    const login = async({username, password, role}) => {

        try{

            const response = await axios.post(`${API_URL}/auth/login`, { username, password })
            const { token, user } = response.data;
            console.log(response.data)
            localStorage.setItem('token', token);
            setUser(user);

            if(role === 'admin') {
                setUser({ username, role });
                navigate('/admin');
            }else if(role === 'user') {
                setUser({ username, role });
                navigate('/');
            }else{
                toast.error('Invalid credentials');
                setUser(null);
                navigate('/login');
            }

        }catch (error) {
            toast.error('Invalid credentials');
            setUser(null);
            navigate('/login');
        }
    }


    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)