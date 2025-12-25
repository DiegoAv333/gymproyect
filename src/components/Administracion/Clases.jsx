import React from 'react';
import DashboardLayout from '../../layouts/AdminLayout'; // Ajusta la ruta si es necesario
import '../Administracion/AdminDashboard.css'; // Importa los estilos CSS unificados
import { FaCalendarAlt } from 'react-icons/fa'; // Importa un icono relevante

const Clases = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 slide-in">Gestión de Clases</h1>
      
      <div className="card rounded-xl p-6 mt-8 slide-in" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-xl font-bold mb-4">Listado de Clases</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm">
                <th className="py-2 pr-4">Nombre de la Clase</th>
                <th className="py-2 pr-4">Instructor</th>
                <th className="py-2 pr-4">Horario</th>
                <th className="py-2 pr-4 text-right">Capacidad</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-700">
                <td className="py-3 pr-4">Yoga Matutino</td>
                <td className="py-3 pr-4">María López</td>
                <td className="py-3 pr-4 text-gray-400">Lun, Mié, Vie 8:00 AM</td>
                <td className="py-3 pr-4 text-right font-medium text-Gym ProyectYellow">20</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="py-3 pr-4">CrossFit Intenso</td>
                <td className="py-3 pr-4">Juan Pérez</td>
                <td className="py-3 pr-4 text-gray-400">Mar, Jue 6:00 PM</td>
                <td className="py-3 pr-4 text-right font-medium text-Gym ProyectYellow">15</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Clases;
