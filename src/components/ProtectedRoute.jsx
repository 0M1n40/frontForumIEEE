import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
    const { user } = useAuth();

    user ?? <Navigate to="/login" />;

    // user.role === "admin" && requiredRole === "user" 
    //     ? <Navigate to="/users" /> 
    //     : user.role === "user" && requiredRole === "admin" 
    //     ? <Navigate to="/" /> 
    //     : null;

    // if (requiredRole && user.role !== requiredRole) 
    //     return <Navigate to="/unauthorized" />;
    
    return children;
}