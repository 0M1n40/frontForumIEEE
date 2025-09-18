import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { RotatingLines } from "react-loader-spinner";
import { useAuth } from "../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../services/Service";
import { toast } from "react-toastify";

function FormCategory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isAuthenticated, isLoading: isAuthLoading, logout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [categoria, setCategoria] = useState({ description: "" });


  // useEffect(() => {
  //   if (!isAuthLoading && !isAuthenticated) {
  //     toast.info("Você precisa estar logado para acessar esta funcionalidade.");
  //     navigate("/login");
  //   }
  // }, [isAuthLoading, isAuthenticated, navigate]);

  async function buscarPorId(id) {
    try {
      await buscar(`/categories/${id}`, setCategoria);
    } catch (error) {
      toast.error("Erro ao buscar a categoria.");
      if (error.response?.status === 403) logout();
    }
  }

  // useEffect(() => {
  //   if (id !== undefined) {
  //     buscarPorId(id);
  //   }
  // }, [id]);

  function atualizarEstado(e) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  async function gerarNovaCategoria(e) {
    e.preventDefault();
    setIsLoading(true);

    const categoriaParaEnviar = { description: categoria.description };
    console.log("Dados da categoria a serem enviados:", categoriaParaEnviar);
    try {
      if (id !== undefined) {
        await atualizar(`/categories/${id}`, categoriaParaEnviar, setCategoria);
        toast.success("Categoria atualizada com sucesso!");
      } else {
        await cadastrar("/categories", categoriaParaEnviar, setCategoria);
        toast.success("Categoria cadastrada com sucesso!");
      }
      navigate("/categorias");
    } catch (error) {
      console.error("Erro completo:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Erro ao processar a categoria. Verifique o console.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto font-poppins">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? "Cadastrar Categoria" : "Editar Categoria"}
      </h1>
      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovaCategoria}>
        <div className="flex flex-col gap-2 font-poppins">
          <label htmlFor="description">Descrição da Categoria</label>
          <input
            type="text"
            placeholder="Insira o nome da categoria"
            name="description"
            className="border-2 border-slate-700 rounded p-2"
            value={categoria.description}
            onChange={atualizarEstado}
            required
          />
        </div>
        <button
          className="mt-4  w-full max-w-150 h-[46px] bg-[#2C3E50] rounded-[20px] text-[#EFEFEF] text-[18px] font-poppins font-normal text-center cursor-pointer hover:opacity-90"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            // <RotatingLines strokeColor="white" strokeWidth="5" width="24" />
            <span>Carregando...</span>
          ) : (
            <span>Confirmar</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormCategory;
