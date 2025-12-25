import React from 'react';
import AppRouter from './router/AppRouter';
import { AuthProvider } from './hooks/useAuth';
import { CartProvider } from './context/CartContext';
import { ClasesProvider } from './context/ClasesContext';
import { PlanesProvider } from './context/PlanesContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ClasesProvider>
          <PlanesProvider>
            <AppRouter />
          </PlanesProvider>
        </ClasesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;