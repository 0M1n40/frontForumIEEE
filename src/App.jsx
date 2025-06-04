import './index.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import NotFound from './pages/NotFound'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from './pages/cadastro/Cadastro'

import MainLayout from './layouts/MainLayouts'
import FormularioNovaDuvida from './components/duvidas/FormularioNovaDuvida'
import ListaDuvida from './components/duvidas/ListaDuvida'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastrar" element={<Cadastro />} />

          {/* MainLayout renderizará Header, MenuLateral, Footer e o <Outlet /> para as rotas aninhadas */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
             <Route path="/home" element={<Home />} />
             <Route path="/nova-duvida" element={<FormularioNovaDuvida />} />
             <Route path="/duvida" element={<ListaDuvida />} />
            


          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;