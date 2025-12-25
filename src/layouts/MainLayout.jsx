import React from 'react';
import { Outlet } from 'react-router-dom';
import './MainLayout.css';
import HeaderPage from '../components/header/HeaderPage';
import FooterPage from '../components/footer/FooterPage';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <HeaderPage />
      <main className="main-content">
        {/* Outlet renderizará el componente de la ruta hija (Home, Planes, etc.) */}
        <Outlet />
      </main>
      <FooterPage className="footer" />
    </div>
  );
};

export default MainLayout;

