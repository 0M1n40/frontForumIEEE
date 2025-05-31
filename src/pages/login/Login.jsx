// src/pages/login/Login.jsx
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import LogoAgora from "../../utils/img/LogoAgora.png";
import BotaoPrincipal from "../../components/buttons/botaoEntrar/BotaoEntrar"; // Renomeado para BotaoEntrar para consistência
import { Oval } from 'react-loader-spinner';
// import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  // Pega user, handleLogin e isLoading (renomeado para authIsLoading) do AuthContext
  const { user, handleLogin, isLoading: authIsLoading } = useAuth();

  // Estado local para o formulário de login
  const [form, setForm] = useState({
    username: "", // Campo para o e-mail (ou nome de usuário, dependendo da API)
    password: "", // Campo para a senha
    // 'role' não é geralmente enviado no login, o backend determina a role com base nas credenciais.
    // Se precisar dele por algum motivo específico, mantenha. Caso contrário, pode ser removido.
  });

  // Estado local para o loading específico desta página/operação
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Efeito para redirecionar se o usuário já estiver logado
  useEffect(() => {
    if (user) {
      navigate("/home");
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
    e.preventDefault(); // Previne o comportamento padrão de submissão
    setIsSubmitting(true); // Ativa o loading local

    try {
      // Chama a função handleLogin do AuthContext com os dados do formulário.
      // O `handleLogin` espera um objeto com `username` e `password`.
      // Se sua API espera 'email' em vez de 'username', você precisará ajustar
      // o objeto enviado ou o estado 'form'. Por ora, mantendo `username`.
      await handleLogin({
          username: form.username,
          password: form.password
      });
      // Se chegou aqui sem erro, o AuthContext já redirecionou para /home
    } catch (error) {
      // O AuthContext já mostra um toast de erro.
      // Tratamentos específicos podem ser adicionados aqui se necessário.
      console.error("Falha ao realizar login (componente):", error);
    } finally {
      setIsSubmitting(false); // Desativa o loading local
    }
  }

  // Exibe o loading animado se o AuthContext estiver carregando ou se o formulário estiver sendo submetido.
  if (authIsLoading || isSubmitting) {
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
            alt="Logo do projeto" // Atualize o alt text
            className="max-w-[55%] md:max-w-[60%] h-auto lg:max-w-[50%] mb-[10%] mt-[-10%]"
          />
        </div>

        <form
          className="flex justify-center items-center flex-col w-11/12 max-w-[500px] min-h-[400px] p-10 gap-3 mt-10 bg-white rounded-xl"
          onSubmit={realizarLogin}
        >
          <h6 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-6 mt-23 text-center opa">Login</h6>

          {/* Campo de e-mail/usuário */}
          <div className="flex flex-col w-full mb-6 text-base sm:text-lg">
            <input
              type="email" // Recomendado usar 'email' se for um email
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

          {/* Botão de login */}
          {/* Desabilitar o botão durante a submissão */}
          <BotaoPrincipal label={"Entrar"} type="submit" disabled={isSubmitting || authIsLoading} />

          <Link to="/cadastrar" className="text-md hover:text-amber-700 cursor-pointer">
            Não tem uma conta? Cadastre-se
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;