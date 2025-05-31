// src/components/menuLateral/MenuLateral.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoAgora from '../../utils/img/LogoAgora.png'; // Verifique se o caminho está correto
import { PlusCircleIcon, HomeIcon, TagIcon, XMarkIcon } from '@heroicons/react/24/outline';

const menuItems = [
  { name: 'Nova dúvida', href: '/nova-duvida', icon: PlusCircleIcon },
  { name: 'Início', href: '/home', icon: HomeIcon },
  { name: 'Tópicos', href: '/topicos', icon: TagIcon },
];

// Adicionamos props para controlar a visibilidade no mobile
function MenuLateral({ isMobileOpen, onClose }) {
  return (
    <>
      {/* Backdrop para fechar o menu no mobile ao clicar fora */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        ></div>
      )}

      <aside
        className={`
          w-64 h-screen bg-[#dbd2c3] text-[#3A3A3A] p-4 flex flex-col
          fixed top-0 left-0 shadow-lg z-50
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 // Garante que em telas 'md' ou maiores, o menu esteja sempre visível e no lugar
        `}
      >
        {/* Botão de Fechar (visível apenas no mobile quando o menu está aberto) */}
        <div className="md:hidden flex justify-end mb-2"> {/* Oculta em telas md ou maiores */}
          <button
            onClick={onClose}
            className="p-2 text-[#3A3A3A] hover:text-gray-700"
            aria-label="Fechar menu"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Logo */}
        <div className="mb-10 mt-2 flex justify-center">
          <Link to="/home" onClick={isMobileOpen ? onClose : undefined}> {/* Fecha menu no clique do logo no mobile */}
            <img src={LogoAgora} alt="Logo Ágora Tech Forum" className="h-40 w-auto" />
          </Link>
        </div>

        {/* Itens do Menu */}
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={isMobileOpen ? onClose : undefined} // Fecha menu no clique do item no mobile
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-md hover:bg-[#cac2b4] transition-colors duration-150 ease-in-out
                 ${isActive ? 'bg-[#cac2b4] font-semibold text-gray-900' : 'font-medium'}`
              }
            >
              <item.icon className="h-6 w-6" aria-hidden="true" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer do menu */}
        <div className="mt-auto">
          <p className="text-xs text-center text-gray-500">© 2024 Ágora</p>
        </div>
      </aside>
    </>
  );
}

export default MenuLateral;