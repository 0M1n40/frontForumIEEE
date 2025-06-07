// src/layouts/MainLayout.jsx (versão simplificada)
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MenuLateral from '../components/menuLateral/MenuLateral';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <MenuLateral isMobileOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      <Header onToggleMobileMenu={toggleMobileMenu} />

      <div className={`flex flex-col min-h-screen pt-20 transition-all duration-300 ease-in-out md:pl-64`}>
        <main className="flex-grow p-6">
          <Outlet />
        </main>
        {/* O Footer agora é renderizado incondicionalmente, pois este layout 
            só aparece em páginas que devem tê-lo. */}
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;