import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts e Componentes de Rota
import MainLayout from './layouts/MainLayouts';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';

// Páginas
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import ListaCategoria from './components/categorias/ListaCategoria';
import FormCategoria from './components/categorias/FormCategorias';
import ListaDuvidas from './components/duvidas/ListaDuvida';
import FormularioNovaDuvida from './components/duvidas/FormularioNovaDuvida';
import NotFound from './pages/NotFound';

function App() {
  return (
    // O BrowserRouter deve ser o componente mais externo que lida com rotas,
    // para que os hooks de navegação (como useNavigate) funcionem em todos os seus filhos.
    <BrowserRouter>
      {/* O AuthProvider vem em seguida, para que o contexto de autenticação 
          esteja disponível para todas as rotas e componentes abaixo dele. */}
      <AuthProvider>

        {/* O ToastContainer pode ficar aqui, garantindo que as notificações 
            estejam disponíveis em toda a aplicação. */}
        <ToastContainer />

        <Routes>
          {/* ROTAS PÚBLICAS */}
         <Route element={<MainLayout />}>
         <Route path="/" element={<Home />} />
         </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastrar" element={<Cadastro />} />

          {/* GRUPO DE ROTAS PROTEGIDAS */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
              <Route path="/categorias" element={<ListaCategoria />} />
              <Route path="/nova-categoria" element={<FormCategoria />} />
              <Route path="/editarCategoria/:id" element={<FormCategoria />} /> 
              <Route path="/duvidas" element={<ListaDuvidas />} />
              <Route path="/nova-duvida" element={<FormularioNovaDuvida />} />

            </Route>
          </Route>

          {/* ROTA DE NOT FOUND (PÁGINA NÃO ENCONTRADA) */}
          <Route path="*" element={<NotFound />} />
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;