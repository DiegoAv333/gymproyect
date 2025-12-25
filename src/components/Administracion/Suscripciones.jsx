import React from 'react';
import DashboardLayout from '../../layouts/AdminLayout'; // Ajusta la ruta si es necesario
import '../Administracion/AdminDashboard.css'; // Importa los estilos CSS unificados
import { FaFileInvoiceDollar, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Importa iconos relevantes

const Suscripciones = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 slide-in">Gestión de Suscripciones</h1>
      
      <div className="card rounded-xl p-6 mt-8 slide-in" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-xl font-bold mb-4">Listado de Suscripciones</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm">
                <th className="py-2 pr-4">Miembro</th>
                <th className="py-2 pr-4">Plan</th>
                <th className="py-2 pr-4">Estado</th>
                <th className="py-2 pr-4">Fecha Inicio</th>
                <th className="py-2 pr-4 text-right">Fecha Fin</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-700">
                <td className="py-3 pr-4">Ana Torres</td>
                <td className="py-3 pr-4">Premium</td>
                <td className="py-3 pr-4 text-green-400 flex items-center"><FaCheckCircle className="mr-1" /> Activa</td>
                <td className="py-3 pr-4 text-gray-400">01/10/2025</td>
                <td className="py-3 pr-4 text-right font-medium text-white">01/11/2025</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="py-3 pr-4">Luis García</td>
                <td className="py-3 pr-4">Básico</td>
                <td className="py-3 pr-4 text-red-400 flex items-center"><FaTimesCircle className="mr-1" /> Vencida</td>
                <td className="py-3 pr-4 text-gray-400">15/09/2025</td>
                <td className="py-3 pr-4 text-right font-medium text-white">15/10/2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Suscripciones;
