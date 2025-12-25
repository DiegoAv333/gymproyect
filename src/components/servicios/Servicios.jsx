import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Servicios.css';
import { clasesData } from '../../data/clasesData';

const Servicios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredClases = clasesData
    .filter((clase) =>
      clase.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((clase) =>
      selectedCategory === 'All' ? true : clase.category === selectedCategory
    );

  const categories = ['All', ...new Set(clasesData.map((clase) => clase.category))];

  return (
    <main className="servicios-page">
      <section className="servicios-contenedor">
        <h1>Nuestros Servicios</h1>

        <div className="filters-container">
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid-servicios">
          {filteredClases.map((item) => {
            const slug = item.name.toLowerCase().replace(/\s+/g, '-');
            return (
              <Link
                to={`/servicios/${slug}`}
                key={item.id}
                className="card-servicio"
                aria-label={`Ver horarios de ${item.name}`}
              >
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="clase-details">
                  <p><strong>Horarios:</strong> {item.horarios.join(', ')}</p>
                  <p><strong>Cupos:</strong> {item.cupos}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Servicios;