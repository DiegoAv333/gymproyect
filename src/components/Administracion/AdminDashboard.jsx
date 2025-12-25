import React, { useState } from 'react';
import '../Administracion/AdminDashboard.css'; // Importa los estilos CSS unificados
import { FaArrowUp } from 'react-icons/fa'; // Importar solo los iconos necesarios para este componente

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('Suscripciones');
    const [displayLimit, setDisplayLimit] = useState(3);

    const dummySubscriptions = [
        { id: 1, member: 'Juan Perez', plan: 'Premium', status: 'Activa', date: '2024-10-26' },
        { id: 2, member: 'Maria Lopez', plan: 'Básico', status: 'Pendiente', date: '2024-10-25' },
    ];

    const dummyPayments = [
        { id: 3, member: 'Carlos Garcia', amount: '$50.00', method: 'Tarjeta', date: '2024-10-25' },
        { id: 4, member: 'Ana Rodriguez', amount: '$40.00', method: 'Transferencia', date: '2024-10-24' },
    ];

    const dummyReservations = [
        { id: 1, member: 'Juan Perez', className: 'Crossfit', time: '10:00', date: '2024-10-28' },
        { id: 2, member: 'Maria Lopez', className: 'Yoga', time: '18:00', date: '2024-10-28' },
        { id: 5, member: 'Pedro Martinez', className: 'Pilates', time: '09:00', date: '2024-10-26' },
    ];

    return(        
    <>
            <h1 className="text-3xl font-bold mb-6 slide-in">Resumen del Gimnasio</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="card rounded-xl p-6 slide-in" style={{ animationDelay: '0.1s' }}>
                    <p className="text-sm text-gray-400">Nuevos Miembros (Mes)</p>
                    <div className="flex items-end justify-between mt-1">
                        <span className="text-4xl font-extrabold text-Gym ProyectYellow">145</span>
                        <span className="text-green-400 text-sm flex items-center">
                            <FaArrowUp className="h-4 w-4 mr-1" />
                            +12%
                        </span>
                    </div>
                </div>
                {/* Card 2 */}
                 <div className="card rounded-xl p-6 slide-in" style={{ animationDelay: '0.2s' }}>
                    <p className="text-sm text-gray-400">Asistencia Hoy</p>
                    <div className="flex items-end justify-between mt-1">
                        <span className="text-4xl font-extrabold text-white">420</span>
                        <div className="text-sm text-gray-400">/ 500</div>
                    </div>
                    <div className="progress-bar mt-4">
                        <div className="progress-fill" style={{ width: '84%' }}></div>
                    </div>
                </div>
                {/* Card 3 */}
                <div className="card rounded-xl p-6 slide-in" style={{ animationDelay: '0.3s' }}>
                    <p className="text-sm text-gray-400">Clases Agendadas</p>
                    <div className="flex items-end justify-between mt-1">
                        <span className="text-4xl font-extrabold text-Gym ProyectLightYellow">35</span>
                        <span className="text-gray-400 text-sm">Próximos 7 días</span>
                    </div>
                </div>
            </div>
            
            {/* Ejemplo de Contenido de Tabla/Tabs */}
            <div className="card rounded-xl p-6 mt-8 slide-in" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-xl font-bold mb-4">Actividad Reciente</h2>
                                <div className="flex border-b border-gray-700 space-x-6 mb-4">
                    <div className={`tab ${activeTab === 'Suscripciones' ? 'active' : 'text-gray-400 hover:text-white'}`} onClick={() => setActiveTab('Suscripciones')}>Suscripciones</div>
                    <div className={`tab ${activeTab === 'Pagos' ? 'active' : 'text-gray-400 hover:text-white'}`} onClick={() => setActiveTab('Pagos')}>Pagos</div> 
                    <div className={`tab ${activeTab === 'Reservas' ? 'active' : 'text-gray-400 hover:text-white'}`} onClick={() => setActiveTab('Reservas')}>Reservas</div>
                </div>
                
                {/* Tabla simplificada */}
                {
                    (() => {
                        const currentData = activeTab === 'Suscripciones' ? dummySubscriptions : activeTab === 'Pagos' ? dummyPayments : dummyReservations;
                        const hasMore = currentData.length > displayLimit;

                        switch (activeTab) {
                            case 'Suscripciones':
                                return (
                                    <div className="fade-in-section overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-700">
                                            <thead>
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Miembro</th>
                                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Plan</th>
                                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Estado</th>
                                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Fecha</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-800">
                                                {dummySubscriptions.slice(0, displayLimit).map(sub => (
                                                    <tr key={sub.id}>
                                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-white">{sub.member}</td>
                                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-white">{sub.plan}</td>
                                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-white">{sub.status}</td>
                                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-white">{sub.date}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {hasMore && (
                                            <button 
                                                onClick={() => setDisplayLimit(currentData.length)}
                                                className="mt-4 px-4 py-2 bg-Gym ProyectYellow text-black rounded-md hover:bg-yellow-500 transition-colors"
                                            >
                                                Ver más
                                            </button>
                                        )}
                                    </div>
                                );
                            case 'Pagos':
                                return (
                                    <div className="fade-in-section overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-700">
                                            <thead>
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Miembro</th>
                                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Monto</th>
                                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Método</th>
                                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Fecha</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-800">
                                                {dummyPayments.slice(0, displayLimit).map(payment => (
                                                    <tr key={payment.id}>
                                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-white">{payment.member}</td>
                                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-white">{payment.amount}</td>
                                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-white">{payment.method}</td>
                                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-white">{payment.date}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {hasMore && (
                                            <button 
                                                onClick={() => setDisplayLimit(currentData.length)}
                                                className="mt-4 px-4 py-2 bg-Gym ProyectYellow text-black rounded-md hover:bg-yellow-500 transition-colors"
                                            >
                                                Ver más
                                            </button>
                                        )}
                                    </div>
                                );
                            case 'Reservas':
                                return (
                                    <div className="fade-in-section overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-700">
                                            <thead>
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Miembro</th>
                                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Clase</th>
                                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Hora</th>
                                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Fecha</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-800">
                                                {dummyReservations.slice(0, displayLimit).map(reservation => (
                                                    <tr key={reservation.id}>
                                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-white">{reservation.member}</td>
                                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-white">{reservation.className}</td>
                                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-white">{reservation.time}</td>
                                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-white">{reservation.date}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {hasMore && (
                                            <button 
                                                onClick={() => setDisplayLimit(currentData.length)}
                                                className="mt-4 px-4 py-2 bg-Gym ProyectYellow text-black rounded-md hover:bg-yellow-500 transition-colors"
                                            >
                                                Ver más
                                            </button>
                                        )}
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })()
                }
            </div>
        </>
    );
};

export default AdminDashboard;