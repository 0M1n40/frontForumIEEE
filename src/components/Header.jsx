
import { useAuth } from "../contexts/AuthContext";

const Header = () => {

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-2xl">Ágora</h1>
      { user && (
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          logout
        </button>
      ) }
    </header>
  );
}

export default Header;