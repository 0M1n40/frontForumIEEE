import { useNavigate, Link } from "react-router-dom";
import "./Cadastro.css"; 
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext"; 
import LogoAgora from "../../utils/img/LogoAgora.png"; 
import BotaoEntrar from "../../components/buttons/botaoEntrar/BotaoEntrar"; 
import { Oval } from 'react-loader-spinner'; 

function Cadastro() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { user, register } = useAuth(); // Troca login por register

  const [form, setForm] = useState({
    id: null,
    nome: "",         // novo campo
    username: "",     // email
    password: "",
    role: "user",
  });

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  function atualizarEstado(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function realizarCadastro(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register(form); // Usa register do AuthContext
    } finally {
      setIsLoading(false);
    }
  }


  // Exibe o loading animado enquanto o login está sendo processado
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Oval
          visible={true}
          height={120}
          width={120}
          color="#60A5FA"
          secondaryColor="#BFDBFE"
          ariaLabel="loading"
        />
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-7 h-screen fundoLogin overflow-auto">
      <div className="relative h-full hidden lg:flex flex-col justify-between lg:col-span-2"></div>

      <div className="flex justify-center items-center flex-col w-full lg:col-span-3 gap-3 rounded-lg">
        <div className="absolute w-[300px] flex justify-center mb-100">
          <img
            src={LogoAgora}
            alt="Logo do projeto VaiComigo"
            className="max-w-[55%] md:max-w-[60%] h-auto lg:max-w-[50%] mb-[40%] mt-[-10%]"
          />
        </div>

        <form
          className="flex justify-center items-center flex-col w-11/12 max-w-[500px] min-h-[400px] p-10 gap-3 mt-10 bg-white rounded-xl"
          onSubmit={realizarCadastro}
        >
          <h6 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-1 mt-27 text-center opa">Cadastro</h6>

          {/* Campo Nome */}
          <div className="flex flex-col w-full mb-4">
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome completo"
              className="border-b border-gray-300 bg-transparent p-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500"
              value={form.nome}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Campo E-mail */}
          <div className="flex flex-col w-full mb-4">
            <input
              type="email"
              id="username"
              name="username"
              placeholder="E-mail"
              className="border-b border-gray-300 bg-transparent p-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500"
              value={form.username}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Campo Senha */}
          <div className="flex flex-col w-full mb-4">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Senha"
              className="border-b border-gray-300 bg-transparent p-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500"
              value={form.password}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Botão de cadastro */}
          <BotaoEntrar label={"Cadastrar"} />

          <Link to="/login" className="text-md hover:text-amber-700 cursor-pointer">
          Já tem uma conta? Faça login
              </Link>


            
    
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
