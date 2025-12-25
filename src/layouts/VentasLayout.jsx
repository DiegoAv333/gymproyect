import React from 'react';
import { Outlet } from 'react-router-dom';

const VentasLayout = () => {

    // Si es de Ventas, renderiza el layout y las rutas anidadas
    return (
        <div>
            {/* Aquí puedes agregar un header o navegación específicos para Ventas */}
            <Outlet />
        </div>
    );
};

export default VentasLayout;
