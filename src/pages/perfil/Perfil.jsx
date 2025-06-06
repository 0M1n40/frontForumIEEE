import React, { useState, useMemo } from "react";
import { useAuth } from "../../contexts/AuthContext";
import EditarNomeModal from "./EditarNomeModal";
import { PencilIcon, CalendarIcon } from "@heroicons/react/24/solid";

function Perfil() {
  const { user, isLoading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dataDeCriacaoFormatada = useMemo(() => {
    if (!user?.created_at) return "";

    const data = new Date(user.created_at);
    return new Intl.DateTimeFormat("pt-BR", {
      month: "long",
      year: "numeric",
    }).format(data);
  }, [user?.created_at]); // Recalcula apenas se a data de criação mudar

  if (isLoading || !user) {
    return <div className="text-center p-10">Carregando perfil...</div>;
  }

  return (
    <>
      <div className="bg-[#f4f1ec] min-h-screen">
        <div className="container mx-auto p-4 md:p-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div
              className="h-48 md:h-64 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.pexels.com/photos/164488/pexels-photo-164488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
              }}
            >
              <div className="h-full w-full bg-black/30"></div>
            </div>

            <div className="px-6 pb-8 text-center -mt-24">
              <div className="relative inline-block">
                {/* ISSO PRECISA MUDAR SE NÃO A IMG NÃO VAI APARECER DIREITO */}
                <img
                  className="h-32 w-32 md:h-40 md:w-40 rounded-full object-cover border-4 border-white shadow-md"
                  src={"https://i.imgur.com/8x5x7wJ.png"}
                  alt={`Foto de perfil de ${user.name}`}
                />
              </div>

              <div className="mt-4 flex justify-center items-center gap-2">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#0D334D]">
                  {user.name}
                </h1>
                <button
                  onClick={() => setIsModalOpen(true)}
                  title="Editar Nome"
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-[#0D334D] transition-colors"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
              </div>

              <p className="text-gray-600 mt-1">
                {user.username || user.email}
              </p>

              {/*  Exibindo a data de criação formatada */}
              {dataDeCriacaoFormatada && (
                <div className="mt-2 flex justify-center items-center gap-2 text-gray-500 text-sm">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Membro desde {dataDeCriacaoFormatada}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* aqui o modal de editar nome é chamado */}
      {isModalOpen && <EditarNomeModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

export default Perfil;
