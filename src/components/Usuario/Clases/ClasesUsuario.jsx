import React, { useState } from 'react';
import './ClasesUsuario.css';
import { availableClasses } from './classData';
import { useClases } from '../../../context/ClasesContext';

const ClasesUsuario = () => {
  const { reserveClass, reservedClasses } = useClases();
  const [notification, setNotification] = useState('');

  const handleReserve = (classToReserve) => {
    const isAlreadyReserved = reservedClasses.some(c => c.id === classToReserve.id);
    if (isAlreadyReserved) {
      setNotification(`Ya has reservado la clase de ${classToReserve.name}.`);
    } else {
      reserveClass(classToReserve);
      setNotification(`¡Has reservado la clase de ${classToReserve.name} con éxito!`);
    }
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="clases-usuario-container">
      <h1>Clases Disponibles</h1>
      <p>Explora nuestras clases y reserva tu lugar.</p>
      {notification && <div className="clase-notification">{notification}</div>}
      <div className="clases-list">
        {availableClasses.map(clase => (
          <div key={clase.id} className="clase-card">
            <h2>{clase.name}</h2>
            <p><strong>Instructor:</strong> {clase.instructor}</p>
            <p><strong>Horario:</strong> {clase.time}</p>
            <p><strong>Duración:</strong> {clase.duration}</p>
            <p>{clase.description}</p>
            <button
              onClick={() => handleReserve(clase)}
              disabled={reservedClasses.some(c => c.id === clase.id)}
              className="reserve-btn"
            >
              {reservedClasses.some(c => c.id === clase.id) ? 'Reservado' : 'Reservar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClasesUsuario;