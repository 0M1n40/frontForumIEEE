import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin, register as apiRegister } from "../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../api/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("user_token");
    const storedUser = localStorage.getItem("user_data");

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setToken(storedToken);
        setIsAuthenticated(true); // Marca como autenticado
        api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      } catch (error) {
        console.error("Falha ao processar dados do localStorage", error);
        handleLogout();
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async (dadosLogin) => {
    setIsLoading(true);
    try {
      // console.log("Tentando logar com:", dadosLogin);
      const resposta = await apiLogin("/auth/login", dadosLogin);

      if (resposta.token && resposta.user) {
        setUser(resposta.user);
        setToken(resposta.token);
        setIsAuthenticated(true); // Esta chamada agora vai funcionar
        localStorage.setItem("user_token", resposta.token);
        localStorage.setItem("user_data", JSON.stringify(resposta.user));
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${resposta.token}`;

        toast.success("Login realizado com sucesso!");
        navigate("/");
      } else {
        toast.info("Resposta inesperada do servidor.");
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        toast.error(data.error || `Erro ${status} no servidor.`);
      } else {
        toast.error("Não foi possível conectar ao servidor.");
      }
      toast.error("Falha ao realizar login. Verifique suas credenciais.");
      console.error("Erro detalhado no login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (registerData) => {
    setIsLoading(true);
    try {
      await apiRegister("/auth/cadastro", registerData);
      toast.success(
        "Cadastro realizado com sucesso! Faça login para continuar."
      );
      navigate("/login");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      const errorMessage =
        error.response?.data?.error || "Erro ao tentar realizar o cadastro.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken("");
    setIsAuthenticated(false); // Garante que o estado seja atualizado
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_data");
    delete api.defaults.headers.common["Authorization"];

    console.log("Usuário desconectado com sucesso.");
    toast.info("Você foi desconectado.");
    navigate("/");
  };

  const updateUserData = (newUserData) => {
    setUser((currentUser) => ({ ...currentUser, ...newUserData }));
    const storedUser = JSON.parse(localStorage.getItem("user_data") || "{}");
    const updatedStoredUser = { ...storedUser, ...newUserData };
    localStorage.setItem("user_data", JSON.stringify(updatedStoredUser));
  };

  //  Disponibiliza TODOS os valores necessários no Provider
  const authContextValue = {
    user,
    isAuthenticated,
    isLoading,
    handleLogin,
    handleRegister,
    handleLogout,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  //  VERIFICA SE O CONTEXTO EXISTE
  if (context === undefined) {
    throw new Error("O hook useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};
