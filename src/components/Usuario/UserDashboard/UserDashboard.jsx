import React from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css';
import { useAuth } from '../../../hooks/useAuth';
import { useClases } from '../../../context/ClasesContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { reservedClasses, cancelClass } = useClases();

  return (
    <div className="app-wrapper">
      <div className="desktop-layout">
        <div className="main-content-area">
          <main className="main-dashboard-content">
            <h1 className="page-title">Bienvenido {user?.displayName || 'Usuario'}</h1>
            
            <div className="card-grid">
              <div className="card card-small yellow-glow">
                <h2 className="card-title">Mi Progreso Semanal</h2>
                <p className="card-metric">85%</p>
              </div>
              <div className="card card-small">
                <h2 className="card-title">Clases Reservadas</h2>
                <p className="card-metric">{reservedClasses.length}</p>
              </div>
              <div className="card card-small">
                <h2 className="card-title">Último Entrenamiento</h2>
                <p className="card-detail">Pecho/Tríceps - Hace 2 días</p>
              </div>
            </div>

            <div className="reserved-classes-section">
              <h2>Mis Clases Reservadas</h2>
              {reservedClasses.length > 0 ? (
                <div className="reserved-classes-grid">
                  {reservedClasses.map(clase => (
                    <div key={clase.id} className="reserved-clase-card">
                      <h3>{clase.name}</h3>
                      <p>{clase.time}</p>
                      <p>con {clase.instructor}</p>
                      <button onClick={() => cancelClass(clase.id)} className="cancel-btn">Cancelar</button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-classes-reserved">
                  <p>Aún no has reservado ninguna clase.</p>
                  <Link to="clases" className="reserve-now-link">¡Reserva una ahora!</Link>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;