import './index.css'
import Home from './pages/Home'
import Login from './pages/login/Login'
import NotFound from './pages/NotFound'
import Unauthorized from './pages/Unauthorized'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Cadastro from './pages/cadastro/Cadastro'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import HeaderWrapper from './components/header/HeaderWrapper'



function AppContent() {
  const location = useLocation();
  const hideFooterRoutes = ["/login", "/cadastrar"];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);


 return (
    <>
      <HeaderWrapper>
      <Header />
      </HeaderWrapper>

       <div className="min-h-[80vh]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastro />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
       {!shouldHideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
        <AppContent />
    </AuthProvider>
      </BrowserRouter>
  );
}
export default App;