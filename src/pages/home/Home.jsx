import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import SidebarLeft from "../../components/sidebarLeft/SidebarLeft";
import Highlights from "../../components/highlights/Highlights";
import Questions from "../../components/questions/Questions";
import RecentTopics from "../../components/recentTopics/RecentTopics";

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <SidebarLeft />
      <Header />

      <main className="pt-24 ml-64 pr-72 pb-24 h-[calc(110vh-5rem)] overflow-y-auto px-6">
        <Highlights />
        <Questions />
      </main>

      <RecentTopics />
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