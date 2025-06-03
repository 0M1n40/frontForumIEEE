import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import SidebarLeft from "../../components/sidebarLeft/SidebarLeft";
import Highlights from "../../components/highlights/Highlights";
import Questions from "../../components/questions/Questions";
import RecentTopics from "../../components/recentTopics/RecentTopics";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Layout com sidebar e conteúdo principal */}
      <div className="flex flex-1">
        <SidebarLeft />
        
        {/* Área principal */}
        <div className="flex-1 flex flex-col">
          <Header />
          
          {/* Conteúdo central com espaço para footer */}
          <main className="flex-1 pt-24 ml-56 pr-72 pb-16 px-6 overflow-y-auto">
            <Highlights />
            <Questions />
          </main>
        </div>
        
        <RecentTopics />
      </div>
      
      <Footer />
    </div>
  );
};

const DefaultHome = () => {
  return (
    <div className="home">
      <h1>Bem-vindo ao Ágora</h1>
      <p>Participe de discussões e encontre respostas para suas dúvidas.</p>
      <div>
        <a href="/login">Entrar</a>
        <a href="/cadastrar">Cadastrar</a>
      </div>
    </div>
  );
};

const LoggedInHome = () => {
  const { logout } = useAuth();

  return (
    <div className="home">
      <h1>Olá, usuário!</h1>
      <p>Você está logado.</p>
      <div>
        <a href="/perfil">Perfil</a>
        <button onClick={logout}>Sair</button>
      </div>
    </div>
  );
};

export default Home;