import React, { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
// import { RotatingLines } from "react-loader-spinner";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const auth = useAuth();

  if(auth){
    const { user, loading } = auth;

    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          {/* <RotatingLines strokeColor="grey" strokeWidth="5" width="50" /> */}
        </div>
      );
    }
    return user ? children : <Navigate to="/login" replace />
    // return user ? children : <div></div>
  }
};

export default ProtectedRoute;
