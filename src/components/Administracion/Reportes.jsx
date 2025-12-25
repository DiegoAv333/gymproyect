import React from 'react';
import DashboardLayout from '../../layouts/AdminLayout'; // Ajusta la ruta si es necesario
import '../Administracion/AdminDashboard.css'; // Importa los estilos CSS unificados
import { FaChartPie, FaDownload, FaFilter } from 'react-icons/fa'; // Importa iconos relevantes

const Reportes = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 slide-in">Generación de Reportes</h1>
      
      <div className="card rounded-xl p-6 mb-8 slide-in" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-xl font-bold mb-4">Opciones de Reporte</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="reportType" className="block text-gray-400 text-sm font-bold mb-2">Tipo de Reporte:</label>
            <select
              id="reportType"
              className="p-3 rounded-lg bg-gray-700 border border-gray-600 text-white w-full focus:outline-none focus:border-Gym ProyectYellow"
            >
              <option value="miembros">Miembros Activos</option>
              <option value="ingresos">Ingresos por Mes</option>
              <option value="clases">Asistencia a Clases</option>
            </select>
          </div>
          <div>
            <label htmlFor="dateRange" className="block text-gray-400 text-sm font-bold mb-2">Rango de Fechas:</label>
            <input
              type="month"
              id="dateRange"
              className="p-3 rounded-lg bg-gray-700 border border-gray-600 text-white w-full focus:outline-none focus:border-Gym ProyectYellow"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="btn-hover bg-Gym ProyectYellow text-Gym ProyectBlack font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
          >
            <FaFilter className="mr-2" /> Generar Reporte
          </button>
        </div>
      </div>

      <div className="card rounded-xl p-6 slide-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-xl font-bold mb-4">Vista Previa del Reporte</h2>
        <p className="text-gray-400">Aquí se mostrará una vista previa del reporte generado.</p>
        {/* Placeholder para el contenido del reporte */}
        <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700 h-48 flex items-center justify-center text-gray-500">
          <p>Contenido del reporte aparecerá aquí...</p>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="btn-hover bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
          >
            <FaDownload className="mr-2" /> Exportar a PDF
          </button>
        </div>
      </div>
    </>
  );
};
export default Reportes;
