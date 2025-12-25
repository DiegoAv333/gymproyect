
import React, { useState, useMemo } from 'react';
import useProductos from '../../hooks/useProductos';
import ProductCard from './productCard/ProductCard';
import LoadingIndicator from '../ui/LoadingIndicator/LoadingIndicator';
import './Tienda.css';

const Tienda = () => {
  const { productos, loading } = useProductos();
  const [sortBy, setSortBy] = useState('alpha'); // 'default', 'alpha', 'price_asc', 'price_desc'

  const sortedProductos = useMemo(() => {
    let sorted = [...productos];
    if (sortBy === 'alpha') {
    sorted.sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''));
    } else if (sortBy === 'price_asc') {
      sorted.sort((a, b) => a.precio - b.precio);
    } else if (sortBy === 'price_desc') {
      sorted.sort((a, b) => b.precio - a.precio);
    }
    return sorted;
  }, [productos, sortBy]);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="tienda-container">
      <div className="filters">
        <label htmlFor="sort-by">Ordenar por: </label>
        <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="alpha">Alfabéticamente</option>
          <option value="price_asc">Precio: Menor a Mayor</option>
          <option value="price_desc">Precio: Mayor a Menor</option>
        </select>
      </div>
      <div className="product-list">
        {sortedProductos.map(producto => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default Tienda;
