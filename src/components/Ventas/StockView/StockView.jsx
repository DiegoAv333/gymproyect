import React from 'react';
import useProductManagement from '../../../hooks/useProductManagement';
import './StockView.css';
import LoadingIndicator from '../../ui/LoadingIndicator/LoadingIndicator';

const StockView = () => {
    const { products, loading } = useProductManagement();
    const getStatus = (stock) => {
        const stockNumber = parseInt(stock, 10);
        if (stockNumber <= 0) return { text: 'Agotado', className: 'status-out' };
        if (stockNumber < 30) return { text: 'Bajo Stock', className: 'status-low' };
        return { text: 'En Stock', className: 'status-ok' };
    };

    return (
        <div className="sales-view-container">
            <h1 className="sales-view-title">Control de Stock</h1>
                <div className="card-style">
                    <table className="stock-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Stock Disponible</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.filter(p => p).map(p => {
                                const status = getStatus(p.stock);
                                return (
                                    <tr key={p.id}>
                                        <td>{p.name}</td>
                                        <td>{p.stock} unidades</td>
                                        <td><span className={`status-badge ${status.className}`}>{status.text}</span></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
        </div>
    );
};

export default StockView;