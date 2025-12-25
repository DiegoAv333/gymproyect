import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Importar el hook de autenticación
import {
    FaUsers, FaCalendarAlt, FaFileInvoiceDollar, FaChartLine, FaChartPie, FaCog, FaSignOutAlt,
    FaClipboardList, FaBox
} from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import '../components/Administracion/AdminDashboard.css'; // Importa los estilos CSS unificados

// Datos de navegación para la Sidebar
const navItems = [
    { name: 'Dashboard', icon: <MdDashboard className="h-5 w-5 mr-3" />, path: '/admin' },
    { name: 'Miembros', icon: <FaUsers className="h-5 w-5 mr-3" />, path: '/admin/miembros' },
    { name: 'Clases', icon: <FaCalendarAlt className="h-5 w-5 mr-3" />, path: '/admin/clases' },
    { name: 'Suscripciones', icon: <FaFileInvoiceDollar className="h-5 w-5 mr-3" />, path: '/admin/suscripciones' },
    { name: 'Planes', icon: <FaClipboardList className="h-5 w-5 mr-3" />, path: '/admin/planes' },
    { name: 'Productos', icon: <FaBox className="h-5 w-5 mr-3" />, path: '/admin/productos' },
    { name: 'Finanzas', icon: <FaChartLine className="h-5 w-5 mr-3" />, path: '/admin/finanzas' },
    { name: 'Reportes', icon: <FaChartPie className="h-5 w-5 mr-3" />, path: '/admin/reportes' },
    { name: 'Configuración', icon: <FaCog className="h-5 w-5 mr-3" />, path: '/admin/configuracion' },
];

// Componente para la barra lateral (Admin)
const Sidebar = ({ isMobileMenuOpen, toggleMobileMenu }) => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Error al cerrar sesión en Admin:", error);
        }
    };
    
    // Contenido de la barra lateral (común a móvil y escritorio)
    const sidebarContent = (
        <div className="p-4">
            <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-Gym ProyectYellow text-Gym ProyectBlack flex items-center justify-center font-bold text-xl">
                    {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="ml-3">
                    <div className="font-medium">{user?.displayName || 'Administrador'}</div>
                    <div className="text-xs text-gray-400">{user?.role}</div>
                </div>
            </div>
            
            <nav>
                {navItems.map((item) => (
                    <NavLink 
                        key={item.name}
                        to={item.path}
                        end
                        className={({ isActive }) =>
                            `sidebar-link flex items-center py-3 px-4 rounded-lg mb-1 ${isActive ? 'active' : ''}`
                        }
                    >
                        {item.icon}
                        {item.name}
                    </NavLink>
                ))}
            </nav>
            
            <div className="mt-8 pt-4 border-t border-gray-800">
                <button onClick={handleLogout} className="sidebar-link flex items-center py-3 px-4 rounded-lg text-red-400 w-full">
                    <FaSignOutAlt className="h-5 w-5 mr-3" />
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
    
    return (
        <aside
            id="admin-sidebar"
            className={`w-64 border-r border-gray-800 bg-Gym ProyectBlack h-full z-50 transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'fixed translate-x-0' : 'hidden'} 
                md:static md:translate-x-0 md:block`}
        >
            <div className="p-4 border-b border-gray-800">
                <div className="flex items-center justify-between">
                    <button className="text-Gym ProyectYellow font-bold text-xl">
                        <span className="bg-Gym ProyectYellow text-Gym ProyectBlack px-2 py-1 rounded">Gym Proyect</span>
                        <span className="ml-1 hidden md:inline">ADMIN</span> {/* Show ADMIN text only on desktop */}
                    </button>
                    <button onClick={toggleMobileMenu} className="text-gray-400 hover:text-white md:hidden"> {/* Hide close button on desktop */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            {sidebarContent}
        </aside>
    );
};

// Componente de Layout del Panel de Administración
const DashboardLayout = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="text-white min-h-screen flex flex-col font-montserrat">
            <div className="flex min-h-screen">
                <Sidebar 
                    isMobileMenuOpen={isMobileMenuOpen} 
                    toggleMobileMenu={toggleMobileMenu} 
                />

                <div className="flex-1 flex flex-col bg-Gym ProyectBlack">
                    <main className="flex-1 p-4 md:p-8" onClick={isMobileMenuOpen ? toggleMobileMenu : null}>
                        {children}
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;