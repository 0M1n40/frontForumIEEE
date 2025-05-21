import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
    const { user } = useAuth();

    user ?? <Navigate to="/login" />;

    if(user.role){
        
        if (requiredRole && user.role !== requiredRole) 
            return <Navigate to="/unauthorized" />;
    }
    
    return children;
}