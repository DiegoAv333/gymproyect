import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useProductManagement from '../../../hooks/useProductManagement';
import './ProductManagement.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditProduct from '../EditProduct/EditProduct';

const ProductManagement = () => {
    const { products, error, addProduct, updateProduct, deleteProduct } = useProductManagement();
    const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '', description: ''});
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const productToAdd = {
            ...newProduct,
            price: parseFloat(newProduct.price),
            stock: parseInt(newProduct.stock, 10)
        };
        const result = await addProduct(productToAdd);
        if (result.success) {
            setNewProduct({ name: '', category: '', price: '', stock: '', description: ''});
        }
    };

    const handleDelete = (id) => {
        setProductToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (productToDelete) {
            await deleteProduct(productToDelete);
            setIsDeleteModalOpen(false);
            setProductToDelete(null);
        }
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setProductToDelete(null);
    };

    const handleEditClick = (product) => {
        setProductToEdit(product);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setProductToEdit(null);
    };

    const handleUpdateProduct = async (id, updatedData) => {
        await updateProduct(id, updatedData);
        handleCloseEditModal();
    };

    return (
        <div className="sales-view-container">
            {isDeleteModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Confirmar Eliminación</h2>
                        <p>¿Estás seguro de que quieres eliminar este producto?</p>
                        <div className="modal-actions">
                            <button onClick={confirmDelete} className="btn-danger">Sí, eliminar</button>
                            <button onClick={cancelDelete} className="btn-secondary">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <EditProduct 
                    product={productToEdit}
                    onSave={handleUpdateProduct}
                    onClose={handleCloseEditModal}
                />
            )}

            <div className="sales-view-header">
                <h1 className="sales-view-title">Gestión de Productos</h1>
                <Link to="/ventas/dashboard" className="btn-back">Volver al Dashboard</Link>
            </div>

            <div className="product-form-container card-style">
                <h2 className="form-title">Agregar Nuevo Producto</h2>
                <form className="product-form" onSubmit={handleAddProduct}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" id="name" name="name" placeholder="Ej: Proteína Whey" value={newProduct.name} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Categoría</label>
                        <input type="text" id="category" name="category" placeholder="Ej: Suplementos" value={newProduct.category} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Precio</label>
                        <input type="number" id="price" name="price" placeholder="0.00" value={newProduct.price} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock">Stock Inicial</label>
                        <input type="number" id="stock" name="stock" placeholder="0" value={newProduct.stock} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descripcion</label>
                        <input type="text" id="description" name="description" placeholder="Proteina de chocolate" value={newProduct.description} onChange={handleInputChange} required />
                    </div>
                    <button type="submit" className="btn-primary" >Guardar Producto</button>
                </form>
            </div>
                <div className="product-table-container card-style">
                    <h2 className="table-title">Listado de Productos</h2>
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.description}</td>
                                    <td className="actions-cell">
                                        <button className="btn-icon" onClick={() => handleEditClick(product)}><FaEdit /></button>
                                        <button className="btn-icon btn-delete" onClick={() => handleDelete(product.id)}><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
    );
};

export default ProductManagement;