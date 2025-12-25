import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ producto }) => {
  return (
    <Link to={`/usuario/producto/${producto.id}`} className="product-card-link">
      <div className="product-card">
        <img src={producto.imagen} alt={producto.nombre} className="product-image" />
        <div className="product-info">
          <h3 className="product-name">{producto.name}</h3>
          <p className="product-price">${producto.price}</p>
        </div>
      </div>
    </Link>
  );
};
export default ProductCard;