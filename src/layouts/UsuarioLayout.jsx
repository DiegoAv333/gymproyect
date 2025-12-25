import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderPage from '../components/header/HeaderPage';

const UsuarioLayout = () => {

    return (
        <div>
            <HeaderPage/>
            <Outlet />
        </div>
    );
};

export default UsuarioLayout;
