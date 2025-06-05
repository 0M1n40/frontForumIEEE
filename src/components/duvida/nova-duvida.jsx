import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import SidebarLeft from "../sidebarLeft/SidebarLeft";


const NovaDuvida = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-1">
        <SidebarLeft />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 pt-24 ml-56 pr-72 pb-16 px-6 overflow-y-auto">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
              {/* Cabeçalho */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Escreva sua dúvida</h1>
              </div>

              {/* Formulário */}
              <div className="question-content space-y-6">
                <div>
                  <label className="title-label block text-lg font-medium text-gray-700 mb-2">
                    Insira um título para sua pergunta
                  </label>
                  <input
                    type="text"
                    className="question-title w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-lg"
                    placeholder="Título..."
                  />
                </div>

                <div>
                  <label className="description-title-label block text-sm font-medium text-gray-500 mb-2">
                    Descreva sua dúvida aqui
                  </label>
                  <textarea
                    className="question-descrition w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="4"
                    placeholder="Descrição..."
                  ></textarea>
                </div>

                {/* Botão de ação */}
                <div className="flex justify-end gap-4">
                    <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors"
                  >
                    Publicar
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NovaDuvida;