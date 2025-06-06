import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { buscar } from "../../services/Service";
import CardDuvida from "../../components/duvidas/CardDuvida"; // Reutilize seu CardDuvida
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

function PaginaPesquisa() {
  const [searchParams] = useSearchParams();
  const termoDeBusca = searchParams.get("q"); // Pega o valor do parâmetro 'q'

  const [resultados, setResultados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Roda a busca sempre que o termo na URL mudar
    if (termoDeBusca) {
      setIsLoading(true);
      buscar(`/duvidas?titulo=${termoDeBusca}`, setResultados)
        .catch(() => toast.error("Erro ao realizar a busca."))
        .finally(() => setIsLoading(false));
    }
  }, [termoDeBusca]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Resultados da busca por:{" "}
        <span className="text-[#0D334D]">{termoDeBusca}</span>
      </h1>

      {isLoading ? (
        <div className="flex justify-center mt-10">
          <RotatingLines width="50" />
        </div>
      ) : resultados.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">
          Nenhum resultado encontrado.
        </p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          {resultados.map((duvida) => (
            <CardDuvida key={duvida.id} duvida={duvida} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PaginaPesquisa;
