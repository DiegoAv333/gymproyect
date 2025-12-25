import React, { useState, useEffect } from 'react';
import './EditProduct.css';

const EditProduct = ({ product, onSave, onClose }) => {
    const [formData, setFormData] = useState({ name: '', category: '', price: '', stock: '', description: '' });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                category: product.category || '',
                price: product.price || '',
                stock: product.stock || '',
                description: product.description || ''
            });
        } else {
            // Reset form data when product is null (modal closed)
            setFormData({ name: '', category: '', price: '', stock: '', description: '' });
        }
    }, [product]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProduct = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock, 10)
        };
        onSave(product.id, updatedProduct);
    };

    if (!product) return null;

    return (
        <div className="edit-product-modal-overlay">
            <div className="edit-product-modal-content">
                <h2>Editar Producto</h2>
                <form onSubmit={handleSubmit} className="edit-product-form">
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Categoría</label>
                        <input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Precio</label>
                        <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock">Stock</label>
                        <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descripción</label>
                        <input type="text" id="description" name="description" value={formData.description} onChange={handleInputChange} required />
                    </div>
                    <div className="modal-actions">
                        <button type="submit" className="btn-primary">Guardar Cambios</button>
                        <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
