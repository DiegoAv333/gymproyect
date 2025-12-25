import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from 'react-router-dom';
import './HeaderPage.css';
import { useAuth } from "../../hooks/useAuth";
import NavigatePage from "./navigate/NavigatePage";
import logo from '../../Image/GymProyect.jpg';
import { useCart } from '../../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

function HeaderPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartItems } = useCart();
    const { user, logout } = useAuth();
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!isProfileMenuOpen);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setProfileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <header className={`app-header ${isMenuOpen ? 'open' : ''}`}>
            <div className="logo">
                <img src={logo} alt="Gym Logo" className="logo-image" />
            </div>
            <NavigatePage isMenuOpen={isMenuOpen} />
            <div className="header-actions">
                {user ? (
                    <>
                        <Link to="/usuario/checkout" className="cart-icon">
                            <FaShoppingCart />
                            {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
                        </Link>
                        <div className="profile-menu" ref={profileMenuRef}>
                            <div className="profile-logo text-black" onClick={toggleProfileMenu}>
                                {user.displayName ? user.displayName.charAt(0).toUpperCase() : ''}
                            </div>
                            {isProfileMenuOpen && (
                                <div className={`dropdown-content ${isProfileMenuOpen ? 'show' : ''}`}>
                                    <NavLink to="configuracion">Configuraciones</NavLink>
                                    <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="header-actions">
                        {/* Aquí podría ir un botón de Login si se desea */}
                    </div>
                )}
                <button className="burger-menu" onClick={toggleMenu} aria-expanded={isMenuOpen} aria-label="Toggle menu">
                    <span className="burger-line"></span>
                    <span className="burger-line"></span>
                    <span className="burger-line"></span>
                </button>
            </div>
        </header>
    );
}

export default HeaderPage;