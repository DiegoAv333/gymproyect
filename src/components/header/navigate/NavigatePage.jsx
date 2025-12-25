import React from "react";
import { NavLink } from "react-router-dom";
import './NavigatePage.css';
import { useAuth } from "../../../hooks/useAuth";

function NavigatePage({ isMenuOpen }) {
    const { user } = useAuth();

    const userDashboardPath = user?.role === 'Ventas' ? '/ventas' : '/usuario';

    return (
        <nav className={`navigate ${isMenuOpen ? 'open' : ''}`}>
            <ul className="navigate-links">
                {user ? (
                    <>
                        <li>
                            <NavLink to={userDashboardPath} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>Inicio</NavLink>
                        </li>
                        <li>
                            <NavLink to="plan-actual" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>Plan Actual</NavLink>
                        </li>
                        <li>
                            <NavLink to="tienda" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>Tienda</NavLink>
                        </li>
                        <li>
                            <NavLink to="clases" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>Clases</NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>Inicio</NavLink>
                        </li>
                        <li>
                            <NavLink to="/planes" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>Planes</NavLink>
                        </li>
                        <li>
                            <NavLink to="/servicios" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>Servicios</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>Login</NavLink>
                        </li>
                        <li className="login-item-mobile">
                            <NavLink to="/login" className="login-link-mobile">Login</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}
export default NavigatePage;