import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-56 right-0 h-20 bg-white shadow px-6 py-4 flex items-center justify-between z-50">
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
  );
};

export default Header;