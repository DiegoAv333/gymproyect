import React from 'react';
import { NavLink, Outlet} from 'react-router-dom';
import './SalesDashboard.css';
import { FaTachometerAlt, FaBoxOpen, FaWarehouse } from 'react-icons/fa';
import { useAuth } from '../../../hooks/useAuth';

const SalesDashboard = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="sales-dashboard-layout">
            <aside className="sales-sidebar">
                <div className="sales-sidebar-header">
                    <h2 className="sales-logo-sub">Ventas</h2>
                </div>
                <nav className="sales-nav">
                    <NavLink to="dashboard" className={({isActive}) => isActive ? "sales-nav-link active" : "sales-nav-link"}>
                        <FaTachometerAlt />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="products" className={({isActive}) => isActive ? "sales-nav-link active" : "sales-nav-link"}>
                        <FaBoxOpen />
                        <span>Productos</span>
                    </NavLink>
                    <NavLink to="stock" className={({isActive}) => isActive ? "sales-nav-link active" : "sales-nav-link"}>
                        <FaWarehouse />
                        <span>Stock</span>
                    </NavLink>
                </nav>
                <div className="sales-sidebar-footer">
                    <div className="sales-nav-link">

                        <div className="logout">
                        <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
                        </div>
                    </div>
                </div>
            </aside>
            <main className="sales-main-content">
                <Outlet /> {/* Aquí se renderizarán las vistas anidadas */}
            </main>
        </div>
    );
};

export default SalesDashboard;