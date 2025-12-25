import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { initMercadoPago } from '@mercadopago/sdk-react';
import App from './App';
import './index.css'; // O tu archivo de estilos principal

initMercadoPago('APP_USR-e726ead0-c5fb-4eb7-ab04-a28c3aa01c19', { locale: 'es-AR' });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
