// src/layouts/MainLayout.jsx
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MenuLateral from '../components/menuLateral/MenuLateral';
import Header from '../components/header/Header'; // Seu Header atualizado precisará de um botão hamburger
import Footer from '../components/footer/Footer';

function MainLayout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const hideFooterRoutes = ['/login', 'cadastrar'];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <MenuLateral isMobileOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      {/* Passa a função toggleMobileMenu para o Header */}
      <Header onToggleMobileMenu={toggleMobileMenu} /> 
      
      <div className={`flex flex-col min-h-screen pt-20 transition-all duration-300 ease-in-out md:pl-64`}>
        <main className="flex-grow p-6">
          <Outlet />
        </main>
        {!shouldHideFooter && <Footer />}
      </div>
    </>
  );
}

export default MainLayout;