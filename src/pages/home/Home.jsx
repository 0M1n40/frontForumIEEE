import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import LogoAgora from "../../utils/img/LogoAgora.png";

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (

    <div className="home-container">
      {/* Sidebar */}
        <aside className="fixed top-0 left-0 w-54 h-screen bg-[rgba(201,166,107,0.30)] flex flex-col items-center py-6 shadow-lg z-40">      
        <img src={LogoAgora} alt="LogoÁgora" className="w-32 h-auto mb-10" />

        <nav className="flex flex-col gap-4 w-full px-6">
          <button
            onClick={() => navigate("/nova-duvida")}
            className="text-left w-full bg-[rgba(201,166,107,0)] px-4 py-2 rounded-lg hover:bg-[#dcd0a6] transition"
          >
            Nova dúvida
          </button>
          <button
            onClick={() => navigate("/home")}
            className="text-left w-full bg-[rgba(201,166,107,0)] px-4 py-2 rounded-lg hover:bg-[#dcd0a6] transition"
          >
            Início
          </button>
          <button
            onClick={() => navigate("/topicos")}
            className="text-left w-full bg-[rgba(201,166,107,0)] px-4 py-2 rounded-lg hover:bg-[#dcd0a6] transition"
          >
            Tópicos
          </button>
        </nav>
      </aside>
                      
      <header className="fixed top-0 left-54 right-0 h-20 bg-white shadow px-6 py-4 flex items-center justify-between z-50">
          {/* Barra de pesquisa */}
          <input
            placeholder="Pesquisar..."
            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Botões de autenticação */}
          <div className="flex gap-2">
            <button 
              type="button"
              className="px-8 py-2 text-white bg-[#2c3e50] rounded-full border hover:bg-[#1a2633] transition-colors duration-300"
              onClick={() => {
              console.log("Clicou em Login");
              navigate("/login");
              }}
            >
              Login
            </button>
            <button 
              type="button"
              className="px-8 py-2 text-white bg-[#2c3e50] rounded-full border hover:bg-[#1a2633] transition-colors duration-300"
              onClick={() => {
              console.log("Clicou em Cadastro"); 
              navigate("/cadastrar");
              }}
            >
              Cadastrar
            </button>
          </div>
        </header>

      {/* Conteúdo Principal */}
      <main className="pt-24 ml-64 pr-72 pb-24 h-[calc(110vh-5rem)] overflow-y-auto px-6">
        {/* Destaques */}
        <section className="highlights flex flex-wrap gap-4 px-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-40 h-40 bg-amber-800 shadow-md rounded-lg p-4 flex flex-col justify-between">
              {/* Conteúdo principal */}
              <div>
                <h3 className="text-white font-medium line-clamp-2 mb-1">Título da dúvida...</h3>
                <p className="text-sm text-amber-100 line-clamp-2">Descrição do card</p>
              </div>

              {/* Ícones de interação */}
              <div className="flex justify-between items-center text-amber-50">
                <div className="flex space-x-3">
                  <span className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    3k
                  </span>
                  <span className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    1k
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Lista de dúvidas */}
        <section className="questions flex flex-col items-center space-y-4 py-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="question-card w-full max-w-2xl bg-white border border-gray-300 px-4 py-3 rounded-lg shadow-sm">
              {/* Cabeçalho */}
              <div className="question-header flex justify-between items-center pb-2 mb-2 border-b border-gray-200">
                <span className="user-name font-semibold text-gray-800">NomeDoUsuario</span>
                <span className="timestamp text-xs text-gray-500">16-05-2025 12:40PM</span>
              </div>
              
              {/* Corpo da pergunta */}
              <p className="question-body text-gray-700 mb-3">Como ordena um Array em Python?</p>
              
              {/* Rodapé */}
              <div className="question-footer flex justify-between items-center text-sm">
                <div className="icons flex space-x-3">
                  <span className="comment-icon flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    2
                  </span>
                  <span className="like-icon flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    35
                  </span>
                </div>
                <button className="answer-button bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                  Responder
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Tópicos Recentes */}
      <aside className="fixed right-5 top-60 w-60 h-[400px] bg-[#C3C3C3] shadow rounded-lg p-4 z-40">
        <h4>Tópicos recentes</h4>
        <ul className="py-6 space-y-2">
          {['java', 'python', 'c#'].map((tag, i) => (
            <li
              key={i}
              onClick={() => navigate(`/topico/${tag}`)}
              className="flex items-center bg-gray-100 justify-between border px-3 py-2 rounded-md hover:bg-gray-200 cursor-pointer transition"
            >
              <span>{tag}</span>
              <span className="text-sm px-2">{Math.floor(Math.random() * 20)}</span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}


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