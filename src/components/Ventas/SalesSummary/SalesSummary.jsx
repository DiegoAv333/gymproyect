import React from 'react';
import './SalesSummary.css';

const SalesSummary = () => {
    return (
        <div className="sales-view-container">
            <h1 className="sales-view-title">Resumen de Ventas</h1>
            <div className="summary-card-grid">
                <div className="summary-card">
                    <h3 className="summary-card-title">Ventas del Mes</h3>
                    <p className="summary-card-metric">$12,450</p>
                    <span className="summary-card-change positive">+5.2% vs mes anterior</span>
                </div>
                <div className="summary-card">
                    <h3 className="summary-card-title">Nuevos Clientes</h3>
                    <p className="summary-card-metric">32</p>
                    <span className="summary-card-change positive">+10% vs mes anterior</span>
                </div>
                <div className="summary-card">
                    <h3 className="summary-card-title">Productos Más Vendidos</h3>
                    <p className="summary-card-detail">Proteína Whey, Creatina</p>
                </div>
            </div>
            {/* Aquí podrías agregar gráficos y más datos */}
        </div>
    );
};

export default SalesSummary;