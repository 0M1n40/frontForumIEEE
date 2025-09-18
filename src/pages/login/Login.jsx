import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import LogoAgora from "../../utils/img/LogoAgora.png";
import BotaoPrincipal from "../../components/buttons/botaoEntrar/BotaoEntrar";
// import { Oval } from "react-loader-spinner";

function Login() {
  const navigate = useNavigate();

  const { user, login, isLoading: authIsLoading } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Estado local para o loading específico desta página/operação
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Efeito para redirecionar se o usuário já estiver logado
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Função para atualizar o estado do formulário
  function atualizarEstado(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // Função para lidar com o envio do formulário de login
  async function realizarLogin(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login({
        email: form.email,
        password: form.password,
      });
      // Se chegou aqui sem erro, o AuthContext já redirecionou para /home
    } catch (error) {
      // Se chegou aqui, fudeu
      console.error("Falha ao realizar login (componente):", error);
    } finally {
      setIsSubmitting(false); // Desativa o loading local
    }
  }

  if (authIsLoading || isSubmitting) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* <Oval
          visible={true}
          height={120}
          width={120}
          color="#60A5FA"
          secondaryColor="#BFDBFE"
          ariaLabel="loading"
        /> */}
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
            alt="Logo Agora"
            className="max-w-[55%] md:max-w-[60%] h-auto lg:max-w-[50%] mb-[10%] mt-[-10%]"
          />
        </div>

        <form
          className="flex justify-center items-center flex-col w-11/12 max-w-[500px] min-h-[400px] p-10 gap-3 mt-10 bg-white rounded-xl"
          onSubmit={realizarLogin}
        >
          <h6 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-6 mt-23 text-center opa">
            Login
          </h6>

          {/* Campo de e-mail/usuário */}
          <div className="flex flex-col w-full mb-6 text-base sm:text-lg">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Usuário (e-mail)"
              className="border-b border-gray-300 bg-transparent p-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500"
              value={form.email}
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

          {/* Botão de login */}
          {/* Desabilitar o botão durante a submissão */}
          <BotaoPrincipal
            label={"Entrar"}
            type="submit"
            disabled={isSubmitting || authIsLoading}
          />

          <Link
            to="/cadastrar"
            className="text-md hover:text-amber-700 cursor-pointer"
          >
            Não tem uma conta? Cadastre-se
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
