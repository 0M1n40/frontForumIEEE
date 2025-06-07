import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function HeaderWrapper({ children }) {

 const location = useLocation();
const initialShowHeader = !(location.pathname === '/login' || location.pathname === '/cadastrar');
const [showHeader, setShowHeader] = useState(initialShowHeader);

useEffect(() => {
  const shouldShow = !(location.pathname === '/login' || location.pathname === '/cadastrar');
  if (shouldShow !== showHeader) { // Apenas atualiza se o estado real mudar
    setShowHeader(shouldShow);
  }
}, [location, showHeader]); 

  return <div>{showHeader && children}</div>;
}

export default HeaderWrapper;