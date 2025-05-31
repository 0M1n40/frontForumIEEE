// src/components/header/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { MagnifyingGlassIcon, UserCircleIcon, PlusIcon, ArrowLeftOnRectangleIcon, Bars3Icon } from '@heroicons/react/24/outline'; // Adicione Bars3Icon

// A prop onToggleMobileMenu vem do MainLayout
function Header({ onToggleMobileMenu }) {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const onLogout = () => {
    handleLogout();
    // navigate('/login'); // Avalie a necessidade desta linha
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log('Buscando por:', searchTerm);
      // navigate(`/pesquisa?q=${searchTerm}`);
    }
  };

  return (
    // z-30 para ficar abaixo do backdrop do menu (z-40) e do menu (z-50)
    <header className="bg-white h-20 shadow-md fixed top-0 left-0 md:left-64 right-0 z-30">
      <div className="container mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Botão Hamburger (VISÍVEL APENAS EM TELAS MENORES QUE 'md') */}
        <div className="md:hidden"> {/* Este div garante que o botão só apareça em mobile */}
          <button
            onClick={onToggleMobileMenu} // Aciona a função para abrir/fechar o menu mobile
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0D334D]"
            aria-label="Abrir menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Campo de Pesquisa (ajustado para ter espaço para o hamburger em mobile) */}
        <form onSubmit={handleSearch} className="relative flex-grow max-w-xs sm:max-w-xl ml-2 md:ml-0">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2.5 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D334D] focus:border-transparent transition-colors"
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </form>

        {/* Botões de Ação (Login/Cadastro ou Perfil/Nova Dúvida) */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {user ? (
            <>
              <Link
                to="/nova-duvida"
                className="hidden sm:flex items-center bg-[#0D334D] text-white px-3 sm:px-4 py-2.5 rounded-lg hover:bg-opacity-90 transition-colors text-xs sm:text-sm font-medium"
              >
                <PlusIcon className="h-5 w-5 mr-0 sm:mr-1.5" />
                <span className="hidden sm:inline">Nova Dúvida</span> {/* Texto oculto em telas muito pequenas */}
              </Link>
              <Link
                to="/perfil"
                className="flex items-center text-gray-700 hover:text-[#0D334D] px-2 sm:px-3 py-2.5 rounded-lg transition-colors"
                title="Perfil"
              >
                <UserCircleIcon className="h-7 w-7" />
                <span className="ml-2 text-sm font-medium hidden sm:block">{user.nome || 'Meu Perfil'}</span>
              </Link>
              <button
                onClick={onLogout}
                title="Sair"
                className="flex items-center text-gray-700 hover:text-red-600 px-2 sm:px-3 py-2.5 rounded-lg transition-colors">
                  <ArrowLeftOnRectangleIcon className="h-7 w-7" /> </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[#0D334D] border border-[#0D334D] px-3 sm:px-5 py-2 rounded-lg hover:bg-[#0D334D] hover:text-white transition-colors text-xs sm:text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/cadastrar"
                className="bg-[#0D334D] text-white px-3 sm:px-5 py-2 rounded-lg hover:bg-opacity-90 transition-colors text-xs sm:text-sm font-medium"
              >
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;