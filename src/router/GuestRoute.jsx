import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const GuestRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return null; // O un spinner de carga
    }

    if (user) {
        if (user.role === 'Ventas') {
            return <Navigate to="/ventas" replace />;
        }
        if (user.role === 'Admin') {
            return <Navigate to="/admin" replace />;
        }
        return <Navigate to="/usuario" replace />;
    }

    return <Outlet />;
};

export default GuestRoute;