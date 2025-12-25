import React from 'react';
import { useParams } from 'react-router-dom';
import { clasesData } from '../../../data/clasesData';
import './ClaseDetail.css';

const ClaseDetail = () => {
  const { slug } = useParams();
  const clase = clasesData.find((c) => c.name.toLowerCase().replace(/\s+/g, '-') === slug);

  if (!clase) {
    return <div>Clase no encontrada</div>;
  }

  return (
    <div className="clase-detail-container">
      <h1>{clase.name}</h1>
      <p>{clase.description}</p>
      <h2>Horarios</h2>
      <ul>
        {clase.horarios.map((horario, index) => (
          <li key={index}>{horario}</li>
        ))}
      </ul>
      <p>Cupos disponibles: {clase.cupos}</p>
    </div>
  );
};

export default ClaseDetail;
