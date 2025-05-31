// src/pages/cadastro/Cadastro.jsx
import { useNavigate, Link } from "react-router-dom";
import "./Cadastro.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import LogoAgora from "../../utils/img/LogoAgora.png";
import BotaoEntrar from "../../components/buttons/botaoEntrar/BotaoEntrar";
import { Oval } from 'react-loader-spinner';
import { toast } from 'react-toastify';

function Cadastro() {
  const navigate = useNavigate();
  // Renomeia isLoading para authIsLoading para evitar conflito com o isLoading local, se houver.
  // Pega a função handleRegister do AuthContext.
  const { user, handleRegister, isLoading: authIsLoading } = useAuth();

  // Estado local para o formulário
  const [form, setForm] = useState({
    nome: "",     
    username: "",  
    password: "",  
   
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

  // Função para lidar com o envio do formulário de cadastro
  async function realizarCadastro(e) {
    e.preventDefault(); // Previne o comportamento padrão de submissão do formulário
    setIsSubmitting(true); // Ativa o loading local

    // Validação simples (pode ser mais robusta)
    if (form.password.length < 6) { // Exemplo: senha com no mínimo 6 caracteres
      // toast.error("A senha deve ter pelo menos 6 caracteres.");
      toast.error("A senha deve ter pelo menos 6 caracteres."); // Use toast para melhor UX
      setIsSubmitting(false);
      return;
    }

    try {
      // Chama a função handleRegister do AuthContext com os dados do formulário
      // A função handleRegister já lida com a navegação e toasts globais
      await handleRegister(form);
      // Se chegou aqui sem erro, o AuthContext já redirecionou para /login
    } catch (error) {
      // O AuthContext já mostra um toast de erro genérico.
      // Você pode adicionar tratamentos específicos aqui se necessário.
      console.error("Falha ao realizar cadastro (componente):", error);
      toast.error("Não foi possível concluir o cadastro. Verifique os dados.");
    } finally {
      setIsSubmitting(false); // Desativa o loading local
    }
  }

  // Exibe o loading animado se o AuthContext estiver carregando (verificação inicial de token)
  // ou se o formulário estiver sendo submetido.
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
              type="email" // Tipo 'email' para validação do navegador
              id="username"
              name="username" // Mantém 'username' se o estado do form usa, mas lembre-se que é o email
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
              placeholder="Senha (mínimo 6 caracteres)"
              className="border-b border-gray-300 bg-transparent p-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500"
              value={form.password}
              onChange={atualizarEstado}
              required
              minLength={6} // Adiciona validação HTML básica
            />
          </div>

          {/* Botão de cadastro */}
          {/* Desabilitar o botão durante a submissão para evitar cliques múltiplos */}
          <BotaoEntrar label={"Cadastrar"} type="submit" disabled={isSubmitting || authIsLoading} />

          <Link to="/login" className="text-md hover:text-amber-700 cursor-pointer">
            Já tem uma conta? Faça login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;