import React, { useState } from 'react';
import Login from './login/Login';
import Register from './Register/register';
import { IoArrowBack } from 'react-icons/io5';
import './PageLogin.css';
import { Link } from 'react-router-dom';

const PageLogin = () => {

  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="login-page-wrapper">
      <div className="PageLogin">
        {/* --- SECCIÓN IZQUIERDA: INFORMACIÓN --- */}
        <div className="info-login">
          <div className="info-login-content">
            <h1>Gym Proyect</h1>
            <h2>Tu viaje hacia una vida más fuerte y saludable comienza aquí.</h2>
            <ul className="beneficios-Login">
              <li>
                <h3>✓</h3>
                <p>Equipamiento de última generación.</p>
              </li>
              <li>
                <h3>✓</h3>
                <p>Clases grupales para todos los niveles.</p>
              </li>
              <li>
                <h3>✓</h3>
                <p>Entrenadores personales certificados.</p>
              </li>
              <li>
                <h3>✓</h3>
                <p>Comunidad de apoyo y motivación.</p>
              </li>
            </ul>
          </div>
        </div>
    {/* --- SECCIÓN DERECHA: FORMULARIO --- */}
        <div className="panel-Login">
        <Link to="/" className="back-button">
          <IoArrowBack />
          <span>Volver al Inicio</span>
        </Link>
          <div className="Login"> {/* Contenedor del formulario */}
            <div className="navigation-Login">
              <button onClick={() => setIsLoginView(true)} className={isLoginView ? 'active' : ''}>Iniciar Sesión</button>
              <button onClick={() => setIsLoginView(false)} className={!isLoginView ? 'active' : ''}>Registrarse</button>
            </div>
            {isLoginView ? <Login /> : <Register />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageLogin;