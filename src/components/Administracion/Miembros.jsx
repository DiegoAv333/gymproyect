import React from 'react';
import useUsuarios from '../../hooks/useUsuarios';
import DashboardLayout from '../../layouts/AdminLayout'; // Ajusta la ruta si es necesario
import '../Administracion/AdminDashboard.css'; // Importa los estilos CSS unificados
import { FaUsers } from 'react-icons/fa'; // Importa un icono relevante

const Miembros = () => {
  const { usuarios, loading } = useUsuarios();

  if (loading) {
    return (
      <>
        <div className="text-white text-center py-8">Cargando miembros...</div>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 slide-in">Gestión de Miembros</h1>
      <div className="card rounded-xl p-6 slide-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-xl font-bold mb-4">Listado de Miembros</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm">
                <th className="py-2 pr-4">Nombre</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Plan</th>
                <th className="py-2 pr-4 text-right">Fecha de registro</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(usuario => (
                <tr key={usuario.id} className="border-t border-gray-700">
                  <td className="py-3 pr-4">{usuario.nombre}</td>
                  <td className="py-3 pr-4">{usuario.email}</td>
                  <td className="py-3 pr-4">{usuario.plan || 'N/A'}</td>
                  <td className="py-3 pr-4 text-right">{usuario.fechaRegistro ? new Date(usuario.fechaRegistro.seconds * 1000).toLocaleDateString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Miembros;
