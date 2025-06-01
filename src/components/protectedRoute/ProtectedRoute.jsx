import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

export default function ProtectedRoute({ children, requiredRole }) {

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }else{
            
           const { role } = user;

            if (requiredRole && role !== requiredRole) 
                return navigate("/unauthorized")
        }
    })

    
    
    return children;
}