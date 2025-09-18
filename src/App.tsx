import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
// Layouts e Componentes de Rota
import MainLayout from "./layouts/MainLayouts";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
 
// Páginas
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import ListaCategoria from "./components/categorias/ListaCategoria";
import FormCategory from "./components/categorias/FormCategory";
import ListaDuvidas from "./components/duvidas/ListaDuvida";
import FormularioNovaDuvida from "./components/duvidas/FormularioNovaDuvida";
import NotFound from "./pages/NotFound";
import DeletarDuvida from "./components/duvidas/DeletarDuvida";
import Perfil from "./pages/perfil/Perfil";
import PaginaPesquisa from "./pages/pesquisa/PaginaPesquisa";
import DetalhesDuvida from "./components/duvidas/DetalhesDuvida";
import Resposta from "./components/respostas/Reply";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
 
        <Routes>
          {/* ROTAS PÚBLICAS */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastrar" element={<Cadastro />} />
          <Route path="/categorias" element={<ListaCategoria />} />
          <Route path="/duvidas" element={<ListaDuvidas />} />
          <Route path='/duvidas/:questionId' element={ <DetalhesDuvida /> } />
          <Route path="/pesquisa" element={<PaginaPesquisa />} />
 
          {/* GRUPO DE ROTAS PROTEGIDAS */}
          <Route 
            path="/nova-categoria" 
            element={
              <ProtectedRoute>
                <FormCategory />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/editarCategoria/:id" 
            element={<FormCategory />} />
          <Route 
            path="/nova-duvida" 
            element={<FormularioNovaDuvida />} />
          <Route
            path="/editarDuvida/:id"
            element={<FormularioNovaDuvida />}
          />
          <Route 
            path="/deletarduvida/:id" 
            element={<DeletarDuvida />} />
          <Route 
            path="/perfil" 
            element={<Perfil />} />
          <Route 
            path="/nova-resposta" 
            element={ <Resposta /> } 
          />

          {/* ROTA DE NOT FOUND (PÁGINA NÃO ENCONTRADA) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
 
export default App;