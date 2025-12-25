import React, { useState } from 'react';
import usePlanes from '../../hooks/usePlanes';
import DashboardLayout from '../../layouts/AdminLayout'; // Ajusta la ruta si es necesario
import '../Administracion/AdminDashboard.css'; // Importa los estilos CSS unificados
import { FaClipboardList, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; // Importa iconos relevantes

const PlanesManagement = () => {
  const { planes, createPlan, updatePlan, deletePlan } = usePlanes();
  const [name, setname] = useState('');
  const [price, setprice] = useState('');
  const [description, setdescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleCreatePlan = async () => {
    if (!name || !price || !description) return;
    await createPlan({ name, price: Number(price), description });
    setname('');
    setprice('');
    setdescription('');
  };

  const handleUpdatePlan = async () => {
    if (!name || !price || !description || !editingId) return;
    await updatePlan(editingId, { name, price: Number(price), description });
    setEditingId(null);
    setname('');
    setprice('');
    setdescription('');
  };

  const handleDeletePlan = async (id) => {
    await deletePlan(id);
  };

  const startEdit = (plan) => {
    setEditingId(plan.id);
    setname(plan.name);
    setprice(plan.price);
    setdescription(plan.description);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 slide-in">Gestión de Planes</h1>

      <div className="card rounded-xl p-6 mb-8 slide-in" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-xl font-bold mb-4">{editingId ? 'Editar Plan' : 'Agregar Nuevo Plan'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre del Plan"
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-Gym ProyectYellow"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <input
            type="number"
            placeholder="Precio"
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-Gym ProyectYellow"
            value={price}
            onChange={(e) => setprice(e.target.value)}
          />
          <textarea
            placeholder="Descripción"
            className="p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-Gym ProyectYellow md:col-span-2"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            rows="3"
          ></textarea>
        </div>
        <div className="mt-6">
          {editingId ? (
            <button
              onClick={handleUpdatePlan}
              className="btn-hover bg-Gym ProyectYellow text-Gym ProyectBlack font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
            >
              <FaEdit className="mr-2" /> Actualizar Plan
            </button>
          ) : (
            <button
              onClick={handleCreatePlan}
              className="btn-hover bg-Gym ProyectYellow text-Gym ProyectBlack font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
            >
              <FaPlus className="mr-2" /> Agregar Plan
            </button>
          )}
        </div>
      </div>

      <div className="card rounded-xl p-6 slide-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-xl font-bold mb-4">Planes Existentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {planes.map((plan) => (
            <div key={plan.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col justify-between">
              <div>
                <h3 className="text-Gym ProyectYellow text-lg font-bold mb-1">{plan.name}</h3>
                <p className="text-white text-2xl font-extrabold mb-2">${plan.price}</p>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => startEdit(plan)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center text-sm"
                >
                  <FaEdit className="mr-2" /> Editar
                </button>
                <button
                  onClick={() => handleDeletePlan(plan.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center text-sm"
                >
                  <FaTrash className="mr-2" /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlanesManagement;
