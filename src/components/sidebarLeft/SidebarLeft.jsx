import { useNavigate } from "react-router-dom";
import LogoAgora from "../../utils/img/LogoAgora.png";

const SidebarLeft = () => {
  const navigate = useNavigate();

  return (
    <aside 
      className="fixed top-0 left-0 w-54 h-900 bg-[rgba(201,166,107,0.30)] flex flex-col items-center py-6 shadow-lg z-40">
      <img src={LogoAgora} alt="Logo Ágora" className="w-32 h-auto mb-10" />

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
  );
};

export default SidebarLeft;
