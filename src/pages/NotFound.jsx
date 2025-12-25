import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const NotFound = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Cargando...</p>;
  }

  let linkTo = "/";
  let linkText = "Volver al Inicio";

  if (user) {
    switch (user.role) {
      case 'Admin':
        linkTo = "/admin";
        linkText = "Ir al Panel de Administrador";
        break;
      case 'Ventas':
        linkTo = "/ventas";
        linkText = "Ir al Panel de Ventas";
        break;
      case 'Usuario':
      case 'SIN_ROL':
        linkTo = "/usuario";
        linkText = "Ir a tu Perfil";
        break;
      default:
        linkTo = "/";
        linkText = "Volver al Inicio";
    }
  }

  return (
    <div style={{ textAlign: 'center', padding: '50px', color: 'white', height: '100vh', backgroundColor: '#1a1a1a' }}>
      <h1>404 - Página No Encontrada</h1>
      <p>La página que buscas no existe o fue movida a otro lugar.</p>
      <Link to={linkTo} style={{ color: '#f0ad4e', textDecoration: 'underline', fontSize: '1.2rem' }}>
        {linkText}
      </Link>
    </div>
  );
};

export default NotFound;
