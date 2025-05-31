
// import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { login as apiLogin, register as apiRegister } from "../api/axios"; // Renomeado para evitar conflito
// import { toast } from 'react-toastify'; // Importe o toast se for usar para notificações
// import 'react-toastify/dist/ReactToastify.css';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null); // Inicializa user como null
//   const [isLoading, setIsLoading] = useState(true); // Inicia como true para verificação inicial do token

//   // Efeito para verificar se existe um token no localStorage quando o componente é montado
//   useEffect(() => {
//     const token = localStorage.getItem('user_token');
//     const storedUser = localStorage.getItem('user_data'); // Supondo que você salve os dados do usuário também

//     if (token && storedUser) {
//       try {
//         const userData = JSON.parse(storedUser);
//         setUser(userData); // Define o usuário com os dados do localStorage
//         // Opcional: Você pode querer verificar a validade do token com o backend aqui
//         // Ex: api.get('/auth/verify').then(...).catch(() => handleLogout());
//         // Por ora, vamos confiar no token e dados locais para restaurar a sessão.
//       } catch (error) {
//         console.error("Falha ao parsear dados do usuário do localStorage", error);
//         // Se houver erro ao parsear, limpa o estado e o localStorage
//         setUser(null);
//         localStorage.removeItem('user_token');
//         localStorage.removeItem('user_data');
//       }
//     }
//     setIsLoading(false); // Finaliza o loading inicial
//   }, []); // Array de dependências vazio para rodar apenas uma vez na montagem

//   // Função para realizar o login
//   const handleLogin = async (loginData) => {
//     setIsLoading(true);
//     try {
//      
//       const response = await apiLogin('/usuarios/logar', loginData); 

//       if (response && response.token && response.usuario) { // Verifique os nomes corretos dos campos retornados pela sua API
//         localStorage.setItem('user_token', response.token); // Salva o token no localStorage
//         localStorage.setItem('user_data', JSON.stringify(response.usuario)); // Salva os dados do usuário
//         setUser(response.usuario); // Define o usuário no estado
//         navigate('/home'); // Redireciona para a home
//         toast.success('Login realizado com sucesso!'); // Notificação de sucesso
//       } else {
//         // Se a resposta não contiver token ou usuário, considera como falha
//         throw new Error(response.message || 'Resposta inválida do servidor ao tentar fazer login.');
//       }
//     } catch (error) {
//       console.error("Erro no login:", error);
//       let errorMessage = "Erro ao tentar fazer login. ";
//       if (error.response && error.response.data && error.response.data.message) {
//         errorMessage += error.response.data.message; // Mensagem de erro da API
//       } else if (error.message) {
//         errorMessage += error.message;
//       } else {
//         errorMessage += "Verifique suas credenciais ou tente novamente mais tarde.";
//       }
//       toast.error(errorMessage); // Notificação de erro
//       setUser(null); // Garante que o usuário não está logado em caso de erro
//       localStorage.removeItem('user_token'); // Remove qualquer token inválido
//       localStorage.removeItem('user_data');
//     } finally {
//       setIsLoading(false); // Finaliza o loading
//     }
//   };

//   // Função para registrar um novo usuário
//   const handleRegister = async (registerData) => {
//     setIsLoading(true);
//     try {
//       // Chama a função de registro da API (do arquivo axios.js)
//       // O backend deve retornar uma mensagem de sucesso ou os dados do usuário criado
//       // O formato do `registerData` deve ser { nome, username (email), password }
//       // Conforme o seu formulário de Cadastro.jsx: form.nome, form.username, form.password
//       await apiRegister('/usuarios/cadastrar', { // Ajuste o endpoint conforme sua API
//         nome: registerData.nome,
//         email: registerData.username, // O backend espera 'email', mas o form usa 'username'
//         senha: registerData.password  // O backend espera 'senha', mas o form usa 'password'
//       });
//       toast.success('Cadastro realizado com sucesso! Faça login para continuar.');
//       navigate('/login'); // Redireciona para a página de login após o cadastro
//     } catch (error) {
//       console.error("Erro no cadastro:", error);
//       let errorMessage = "Erro ao tentar realizar o cadastro. ";
//       if (error.response && error.response.data && error.response.data.message) {
//         errorMessage += error.response.data.message;
//       } else {
//         errorMessage += "Tente novamente mais tarde.";
//       }
//       toast.error(errorMessage);
//       throw error; // Re-lança o erro para que o componente de cadastro possa lidar com ele se necessário
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Função para realizar o logout
//   const handleLogout = () => {
//     setUser(null); // Remove o usuário do estado
//     localStorage.removeItem('user_token'); // Remove o token do localStorage
//     localStorage.removeItem('user_data'); // Remove os dados do usuário do localStorage
//     navigate('/'); // Redireciona para a página inicial ou de login
//     toast.info('Você foi desconectado.');
//   };

//   // Fornece o estado do usuário, as funções de login, registro e logout, e o estado de loading
//   return (
//     <AuthContext.Provider value={{ user, handleLogin, handleRegister, handleLogout, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



// // Hook customizado para facilitar o uso do contexto de autenticação
// export const useAuth = () => useContext(AuthContext);

// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Comente as importações da API real enquanto estiver testando localmente sem backend
// import { login as apiLogin, register as apiRegister } from "../api/axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

// Variável para simular um "banco de dados" de usuários em memória
const mockUserDatabase = []; // { id, nome, username (email), password }

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    setIsLoading(true); // Começa carregando
    const token = localStorage.getItem('user_token');
    const storedUser = localStorage.getItem('user_data');

    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // Simula uma verificação de token: se o usuário existir no "banco de dados" simulado
        const foundUser = mockUserDatabase.find(u => u.username === userData.username && u.token === token);
        if (foundUser) {
          setUser(userData);
        } else {
          // Token inválido ou usuário não encontrado na simulação, desloga
          localStorage.removeItem('user_token');
          localStorage.removeItem('user_data');
          setUser(null);
        }
      } catch (error) {
        console.error("Falha ao parsear dados do usuário do localStorage", error);
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_data');
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  // Função para simular o login
  const handleLogin = async (loginData) => {
    setIsLoading(true);
    console.log("Tentando login com (simulado):", loginData);

    await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay da rede

    // Procura o usuário no "banco de dados" simulado
    const foundUser = mockUserDatabase.find(
      (dbUser) => dbUser.username === loginData.username && dbUser.password === loginData.password
    );

    if (foundUser) {
      const mockToken = `mock_token_${Date.now()}`; // Gera um token fictício
      const userToStore = { id: foundUser.id, nome: foundUser.nome, username: foundUser.username }; // Não armazene a senha!

      localStorage.setItem('user_token', mockToken);
      localStorage.setItem('user_data', JSON.stringify(userToStore));
      setUser(userToStore);
      navigate('/home');
      toast.success('Login simulado realizado com sucesso!');
    } else {
      toast.error('Login simulado falhou: Usuário ou senha inválidos.');
      setUser(null);
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_data');
    }
    setIsLoading(false);
  };

  // Função para simular o registro
  const handleRegister = async (registerData) => {
    setIsLoading(true);
    console.log("Tentando registrar (simulado):", registerData);

    await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay da rede

    // Verifica se o email (username) já existe no "banco de dados" simulado
    if (mockUserDatabase.some((dbUser) => dbUser.username === registerData.username)) {
      toast.error('Cadastro simulado falhou: E-mail já cadastrado.');
      setIsLoading(false);
      throw new Error('E-mail já cadastrado'); // Para que o componente Cadastro possa tratar
    }

    // Adiciona o novo usuário ao "banco de dados" simulado
    const newUser = {
      id: `mock_id_${Date.now()}`, // Gera um ID fictício
      nome: registerData.nome,
      username: registerData.username, // Este é o email
      password: registerData.password, // Em um backend real, você armazenaria um hash da senha
    };
    mockUserDatabase.push(newUser);

    console.log("Banco de dados simulado após registro:", mockUserDatabase);
    toast.success('Cadastro simulado realizado com sucesso! Faça login.');
    navigate('/login');
    setIsLoading(false);
  };

  // Função para realizar o logout (permanece igual)
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_data');
    // Atualiza o "banco de dados" simulado para remover o token do usuário se necessário
    // (opcional, pois o token é local e não persistido entre recargas da página no mockUserDatabase)
    navigate('/');
    toast.info('Você foi desconectado (simulado).');
  };
  const Logout = () => {
    setUser(null);
    // outras ações de logout...
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleRegister, handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);