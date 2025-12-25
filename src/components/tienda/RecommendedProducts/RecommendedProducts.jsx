import React from 'react';
import ProductCard from '../productCard/ProductCard';
import './RecommendedProducts.css';

const RecommendedProducts = ({ products }) => {
    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div className="recommended-products-container">
            <h2>También te podría interesar</h2>
            <div className="recommended-products-grid">
                {products.map(product => (
                    <ProductCard key={product.id} producto={product} />
                ))}
            </div>
        </div>
    );
};

export default RecommendedProducts;
