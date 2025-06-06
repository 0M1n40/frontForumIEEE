import { createRoot } from 'react-dom/client'
import './index.css'

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import NotFound from './pages/NotFound'
import Unauthorized from './pages/Unauthorized'
import NovaDuvida from "./components/duvida/nova-duvida"

import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
import Cadastro from './pages/cadastro/Cadastro'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={ <Home /> } />
        <Route path="/login" element={ <Login />} />
        <Route path="/cadastrar" element={ <Cadastro />} />
        <Route path="/forgot-password" element={ <ForgotPassword />} />
        <Route path="/nova-duvida" element={ <NovaDuvida />} />
        <Route 
          path="/users" 
          element={ 
            <ProtectedRoute requiredRole="admin">
              
            </ProtectedRoute>
          } />
        <Route path="/unauthorized" element={ <Unauthorized />} />
        <Route path="*" element={ <NotFound />} />
      </Routes>
    </AuthProvider >
  </BrowserRouter>
)