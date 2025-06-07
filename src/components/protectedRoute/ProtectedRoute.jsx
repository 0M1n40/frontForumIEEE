import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  //  Enquanto o contexto de autenticação está carregando (verificando o localStorage),
  //   mostramos um indicador de loading para evitar piscar a tela de login.
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RotatingLines strokeColor="grey" strokeWidth="5" width="50" />
      </div>
    );
  }

  //  Após o carregamento, verificamos se o usuário está autenticado.
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
