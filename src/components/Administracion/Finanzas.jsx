import React from 'react';
import DashboardLayout from '../../layouts/AdminLayout'; // Ajusta la ruta si es necesario
import '../Administracion/AdminDashboard.css'; // Importa los estilos CSS unificados
import { FaChartLine, FaArrowUp, FaArrowDown } from 'react-icons/fa'; // Importa iconos relevantes

const Finanzas = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 slide-in">Análisis Financiero</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card Ingresos */} 
        <div className="card rounded-xl p-6 slide-in" style={{ animationDelay: '0.1s' }}>
          <p className="text-sm text-gray-400">Ingresos del Mes</p>
          <div className="flex items-end justify-between mt-1">
            <span className="text-4xl font-extrabold text-Gym ProyectYellow">$12,345</span>
            <span className="text-green-400 text-sm flex items-center">
              <FaArrowUp className="h-4 w-4 mr-1" />
              +8%
            </span>
          </div>
        </div>
        
        {/* Card Egresos */} 
        <div className="card rounded-xl p-6 slide-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-sm text-gray-400">Egresos del Mes</p>
          <div className="flex items-end justify-between mt-1">
            <span className="text-4xl font-extrabold text-white">$4,567</span>
            <span className="text-red-400 text-sm flex items-center">
              <FaArrowDown className="h-4 w-4 mr-1" />
              -3%
            </span>
          </div>
        </div>
        
        {/* Card Balance */} 
        <div className="card rounded-xl p-6 slide-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-sm text-gray-400">Balance Neto</p>
          <div className="flex items-end justify-between mt-1">
            <span className="text-4xl font-extrabold text-Gym ProyectLightYellow">$7,778</span>
            <span className="text-green-400 text-sm">+5%</span>
          </div>
        </div>
      </div>

      <div className="card rounded-xl p-6 mt-8 slide-in" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-xl font-bold mb-4">Transacciones Recientes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm">
                <th className="py-2 pr-4">Descripción</th>
                <th className="py-2 pr-4">Tipo</th>
                <th className="py-2 pr-4">Fecha</th>
                <th className="py-2 pr-4 text-right">Monto</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-700">
                <td className="py-3 pr-4">Suscripción Premium - Ana T.</td>
                <td className="py-3 pr-4">Ingreso</td>
                <td className="py-3 pr-4 text-gray-400">25/10/2025</td>
                <td className="py-3 pr-4 text-right font-medium text-Gym ProyectYellow">$59.99</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="py-3 pr-4">Pago de Alquiler Local</td>
                <td className="py-3 pr-4">Egreso</td>
                <td className="py-3 pr-4 text-gray-400">20/10/2025</td>
                <td className="py-3 pr-4 text-right font-medium text-white">-$1,500.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Finanzas;
