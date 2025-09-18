import { createContext, useContext, useState, useEffect, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin, register as apiRegister, refreshToken as apiRefreshToken, logout as apiLogout } from "../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authContextType, LoginData, RegisterData } from "../types";

const AuthContext = createContext<authContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    trySilentLogin()
  }, []);

  const trySilentLogin = async () => {
    try{

      const { accessToken, user } = await apiRefreshToken();
      setAccessToken(accessToken);
      setUser(user);
      toast.success(`Bem-vindo de volta, ${user.name}!`);

    } catch (err) {
      console.log('silent login failed', err)
    } finally {
      setIsLoading(false);
    }
  }

  const login = async (data: LoginData) => {
    const { accessToken, user } = await apiLogin(data);
    setAccessToken(accessToken);
    setUser(user);
    toast.success(`Bem-vindo de volta, ${user.name}!`);
    navigate("/");
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);

    try {
      await apiRegister(data);
      toast.success(
        "Cadastro realizado com sucesso! Faça login para continuar."
      );
      navigate("/login");

    } catch (error: any | Error) {
      console.error("Erro no cadastro:", error);
      const errorMessage =
        error.response?.data?.error || "Erro ao tentar realizar o cadastro.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await apiLogout()
    setAccessToken(null)
    setUser(null);

    console.log("usuário desconectado com sucesso.");
    toast.info("Você foi desconectado.");
    navigate("/");
  };

  const authContextValue = {
    user,
    accessToken,
    login,
    logout,
    loading,
    register
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context) {
    return context;
  }
};