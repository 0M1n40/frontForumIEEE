import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; 
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext"; 
import LogoAgora from "../../utils/img/LogoAgora.png"; 
import BotaoPrincipal from "../../components/buttons/botaoEntrar/BotaoEntrar"; 
import { Oval } from 'react-loader-spinner'; 

function Login() {
  const navigate = useNavigate(); // Hook para redirecionar páginas
  const [isLoading, setIsLoading] = useState(false); // Estado para loading
  const { user, login } = useAuth(); // Pega dados do usuário e função de login

  // Estado do formulário
  const [form, setForm] = useState({
    username: "", // campo de e-mail
    password: "", // campo de senha
    role: "user", // padrão como "user"; pode ser alterado depois se necessário
  });

  // Se o usuário já estiver logado, redireciona para a home
  useEffect(() => {
    if (!user) { // depois tirar o !
      navigate("/home");
    }
  }, [user, navigate]);

  // Atualiza os campos do formulário conforme o usuário digita
  function atualizarEstado(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // Função executada ao enviar o formulário
  async function realizarLogin(e) {
    e.preventDefault(); // Evita o reload da página
    setIsLoading(true); // Exibe o loader

    try {
      await login(form); // Chama o login com os dados preenchidos
    } finally {
      setIsLoading(false); // Remove o loader
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

  // Tela principal de login
  return (
    <div className="grid lg:grid-cols-7 h-screen fundoLogin overflow-auto">
      {/* Coluna lateral esquerda (vazia no momento) */}
      <div className="relative h-full hidden lg:flex flex-col justify-between lg:col-span-2"></div>

      {/* Área do formulário */}
      <div className="flex justify-center items-center flex-col w-full lg:col-span-3 gap-3 rounded-lg">
        {/* Logo */}
        <div className="absolute w-[300px] flex justify-center mb-100">
          <img
            src={LogoAgora}
            alt="Logo do projeto VaiComigo"
            className="max-w-[55%] md:max-w-[60%] h-auto lg:max-w-[50%] mb-[10%] mt-[-10%]"
          />
        </div>

        {/* Formulário de login */}
        <form
          className="flex justify-center items-center flex-col w-11/12 max-w-[500px] min-h-[400px] p-10 gap-3 mt-10 bg-white rounded-xl"
          onSubmit={realizarLogin}
        >
          <h6 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-6 mt-23 text-center opa">Login</h6>

          {/* Campo de e-mail */}
          <div className="flex flex-col w-full mb-6 text-base sm:text-lg">
            <input
              type="email"
              id="username"
              name="username"
              placeholder="Usuário (e-mail)"
              className="border-b border-gray-300 bg-transparent p-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500"
              value={form.username}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Campo de senha */}
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

          {/* Campo para selecionar a role (opcional para testes futuros) */}
          {/* 
          <select name="role" value={form.role} onChange={atualizarEstado} className="border rounded px-3 py-2">
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
          */}

          {/* Botão de login */}
          <BotaoPrincipal label={"Entrar"} />

          {/* Link para login ] */}
          <Link to="/cadastrar" className="text-md hover:text-amber-700 cursor-pointer">
          Não tem uma conta? Cadastre-se
              </Link>

        </form>
      </div>
    </div>
  );
}

export default Login;
