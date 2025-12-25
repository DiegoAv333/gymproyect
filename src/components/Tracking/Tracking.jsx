import React, { useState } from 'react';
import './TrackingStyles.css'; // Importa los estilos CSS personalizados

// Componente para el Header
const Header = () => (
    <header className="bg-Gym ProyectBlack py-4 border-b border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
            <a href="#" className="text-Gym ProyectYellow font-bold text-xl flex items-center">
                <span className="bg-Gym ProyectYellow text-Gym ProyectBlack px-2 py-1 rounded">Gym Proyect</span>
                <span className="ml-1">GIMNASIO</span>
            </a>
            <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-white hover:text-Gym ProyectYellow transition">Inicio</a>
                <a href="#" className="text-white hover:text-Gym ProyectYellow transition">Planes</a>
                <a href="#" className="text-white hover:text-Gym ProyectYellow transition">Clases</a>
                <a href="#" className="text-white hover:text-Gym ProyectYellow transition">Tienda</a>
                <a href="#" className="text-white hover:text-Gym ProyectYellow transition">Contacto</a>
            </nav>
            <div className="flex items-center space-x-4">
                <a href="#" className="text-white hover:text-Gym ProyectYellow transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </a>
                <a href="#" className="text-white hover:text-Gym ProyectYellow transition relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="absolute -top-2 -right-2 bg-Gym ProyectYellow text-Gym ProyectBlack rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                </a>
                <button className="md:hidden text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </div>
    </header>
);

// Componente del Modal para Editar Dirección
const EditAddressModal = ({ isOpen, onClose }) => {
    // Usamos 'open' en el className para activar los estilos CSS del modal
    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <button onClick={onClose} className="close-modal text-3xl">&times;</button>
                <h2 className="text-2xl font-bold mb-4">Editar Dirección de Entrega</h2>
                <form>
                    {/* Campos de formulario simplificados */}
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-gray-400 mb-2">Nueva Dirección</label>
                        <input type="text" id="address" className="w-full bg-Gym ProyectBlack bg-opacity-50 border border-gray-700 rounded-lg p-3 text-white" placeholder="Av. Principal #123" />
                    </div>
                    <button type="submit" className="w-full bg-Gym ProyectYellow text-Gym ProyectBlack py-2 rounded-lg font-medium hover:bg-Gym ProyectDarkYellow transition">Guardar Cambios</button>
                </form>
            </div>
        </div>
    );
};

// Componente Principal de Seguimiento
const ShippingTracking = () => {
    // Estado para controlar la visibilidad del historial detallado
    const [isTimelineOpen, setIsTimelineOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0);

    const toggleTimeline = () => setIsTimelineOpen(!isTimelineOpen);
    const showEditAddressModal = () => setIsModalOpen(true);
    const closeEditAddressModal = () => setIsModalOpen(false);
    const rateExperience = (stars) => setRating(stars);

    // Datos simulados para el seguimiento (en una app real vendrían de una API)
    const trackingSteps = [
        { label: "Confirmado", date: "16 Ago, 10:30", status: "completed" },
        { label: "Preparando", date: "16 Ago, 14:45", status: "completed" },
        { label: "En camino", date: "17 Ago, 09:15", status: "active" },
        { label: "Entregado", date: "Pendiente", status: "pending" },
    ];
    const trackingProgressWidth = "66%"; // Se obtiene dinámicamente en una app real
    const estimatedDelivery = "18 Agosto, 2023";

    const renderRatingStars = (maxStars = 5) => {
        return [...Array(maxStars)].map((_, index) => {
            const starValue = index + 1;
            const starClass = starValue <= rating ? 'text-Gym ProyectYellow active' : 'text-gray-600';
            return (
                <svg
                    key={index}
                    onClick={() => rateExperience(starValue)}
                    className={`h-6 w-6 rating-star ${starClass}`}
                    fill={starValue <= rating ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor"/>
                </svg>
            );
        });
    };

    return (
        <div className="min-h-screen bg-Gym ProyectBlack font-montserrat">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-start justify-between mb-8">
                    <div className="slide-in">
                        <h1 className="text-3xl font-bold mb-2">Seguimiento de Envío</h1>
                        <p className="text-gray-400">Pedido #Gym Proyect-12345 • 16 Agosto, 2023</p>
                    </div>
                    <div className="mt-4 md:mt-0 slide-in" style={{ animationDelay: '0.1s' }}>
                        <a href="#" className="text-Gym ProyectYellow hover:text-Gym ProyectDarkYellow transition flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            Volver a Mis Pedidos
                        </a>
                    </div>
                </div>

                {/* Tracking Status Card */}
                <div className="card rounded-xl p-6 mb-8 slide-in" style={{ animationDelay: '0.2s' }}>
                    <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                        <div className="flex items-center mb-4 md:mb-0">
                            <div className="bg-green-500 rounded-full w-3 h-3 mr-2 pulse"></div>
                            <span className="font-medium">En camino</span>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-Gym ProyectYellow mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-400">Entrega estimada: <span className="text-white font-medium">{estimatedDelivery}</span></span>
                        </div>
                    </div>

                    {/* Tracking Progress */}
                    <div className="relative mb-12 pt-6">
                        <div className="tracking-line"></div>
                        <div className="tracking-line-progress" style={{ width: trackingProgressWidth }}></div>
                        <div className="grid grid-cols-4 gap-4">
                            {trackingSteps.map((step, index) => (
                                <div key={index} className={`tracking-step ${step.status}`}>
                                    <div className="tracking-dot"></div>
                                    <div className="tracking-label">{step.label}</div>
                                    <div className="tracking-date">{step.date}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Map View */}
                    <div className="map-container mb-6">
                        <div className="map-placeholder">
                            <div className="map-route"></div>
                            <div className="map-start-pin"></div>
                            <div className="map-end-pin"></div>
                            <div className="delivery-vehicle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-Gym ProyectYellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                            </div>
                            <div className="absolute bottom-4 left-4 bg-Gym ProyectBlack bg-opacity-70 p-2 rounded-lg text-xs">
                                <div className="flex items-center mb-1">
                                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                    <span>Origen: Almacén Gym Proyect</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                                    <span>Destino: Tu dirección</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Dirección de Entrega */}
                        <div className="bg-Gym ProyectBlack bg-opacity-50 p-4 rounded-lg">
                            <div className="flex items-center mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-Gym ProyectYellow mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <h3 className="font-medium">Dirección de Entrega</h3>
                            </div>
                            <p className="text-gray-400 text-sm">Carlos Rodríguez</p>
                            <p className="text-gray-400 text-sm">Av. Principal #123, Piso 4</p>
                            <p className="text-gray-400 text-sm">Colonia Centro</p>
                            <p className="text-gray-400 text-sm">Ciudad de México, 06000</p>
                            <button className="text-Gym ProyectYellow text-sm mt-3 flex items-center hover:text-Gym ProyectDarkYellow transition" onClick={showEditAddressModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                Editar dirección
                            </button>
                        </div>

                        {/* Repartidor */}
                        <div className="bg-Gym ProyectBlack bg-opacity-50 p-4 rounded-lg">
                            <div className="flex items-center mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-Gym ProyectYellow mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <h3 className="font-medium">Repartidor</h3>
                            </div>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-Gym ProyectGray rounded-full flex items-center justify-center mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium">Miguel Ángel</p>
                                    {/* Estrellas de rating (simuladas aquí) */}
                                    <div className="flex items-center text-yellow-400 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full bg-Gym ProyectYellow text-Gym ProyectBlack py-2 rounded-lg font-medium hover:bg-Gym ProyectDarkYellow transition mt-3 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Contactar
                            </button>
                        </div>

                        {/* Opciones de Entrega */}
                        <div className="bg-Gym ProyectBlack bg-opacity-50 p-4 rounded-lg">
                            <div className="flex items-center mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-Gym ProyectYellow mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                                <h3 className="font-medium">Opciones de Entrega</h3>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-400 text-sm">Método de envío:</span>
                                <span className="text-sm">Estándar</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-400 text-sm">Instrucciones:</span>
                                <span className="text-sm">Dejar con portero</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400 text-sm">Firma requerida:</span>
                                <span className="text-sm">Sí</span>
                            </div>
                            <div className="border-t border-gray-700 my-3"></div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400 text-sm">Costo de envío:</span>
                                <span className="text-Gym ProyectYellow font-medium">Gratis</span>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Timeline */}
                    <div className="mt-6">
                        <button className="flex items-center text-Gym ProyectYellow hover:text-Gym ProyectDarkYellow transition mb-4" onClick={toggleTimeline}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 transform transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ transform: isTimelineOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                            Ver historial detallado
                        </button>
                        <div id="timeline" className={isTimelineOpen ? 'block' : 'hidden'}>
                            {/* Items de la línea de tiempo */}
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <div className="flex justify-between mb-1">
                                        <span className="font-medium">Pedido confirmado</span>
                                        <span className="text-gray-400 text-sm">16 Ago, 10:30</span>
                                    </div>
                                    <p className="text-gray-400 text-sm">Tu pedido ha sido recibido y confirmado.</p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <div className="flex justify-between mb-1">
                                        <span className="font-medium">Pago procesado</span>
                                        <span className="text-gray-400 text-sm">16 Ago, 10:32</span>
                                    </div>
                                    <p className="text-gray-400 text-sm">El pago ha sido procesado correctamente.</p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <div className="flex justify-between mb-1">
                                        <span className="font-medium">Preparando pedido</span>
                                        <span className="text-gray-400 text-sm">16 Ago, 14:45</span>
                                    </div>
                                    <p className="text-gray-400 text-sm">Tu pedido está siendo preparado en nuestro almacén.</p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <div className="flex justify-between mb-1">
                                        <span className="font-medium">Pedido empaquetado</span>
                                        <span className="text-gray-400 text-sm">17 Ago, 08:20</span>
                                    </div>
                                    <p className="text-gray-400 text-sm">Tu pedido ha sido empaquetado y está listo para envío.</p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <div className="flex justify-between mb-1">
                                        <span className="font-medium">En camino</span>
                                        <span className="text-gray-400 text-sm">17 Ago, 09:15</span>
                                    </div>
                                    <p className="text-gray-400 text-sm">Tu pedido está en camino a la dirección de entrega.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Items (Left Column) */}
                    <div className="lg:col-span-2 space-y-6 slide-in" style={{ animationDelay: '0.3s' }}>
                        <h2 className="text-xl font-bold mb-4">Detalles del Pedido</h2>
                        {/* Order Item 1 */}
                        <div className="card rounded-xl p-4 md:p-6">
                            <div className="flex flex-col md:flex-row items-center">
                                <div className="w-full md:w-24 h-24 bg-Gym ProyectGray rounded-lg flex items-center justify-center mb-4 md:mb-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-Gym ProyectYellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <div className="flex-1 md:ml-6 text-center md:text-left">
                                    <h3 className="font-bold text-lg">Camiseta Deportiva Gym Proyect</h3>
                                    <p className="text-gray-400 text-sm mb-2">Talla M - Color Negro</p>
                                    <div className="flex items-center justify-center md:justify-start text-sm">
                                        <span className="text-gray-400">Cantidad:</span>
                                        <span className="ml-2 font-medium">1</span>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-center">
                                    <span className="text-Gym ProyectYellow font-bold text-xl mb-2">$29.99</span>
                                </div>
                            </div>
                        </div>

                        {/* Order Item 2 */}
                        <div className="card rounded-xl p-4 md:p-6">
                            <div className="flex flex-col md:flex-row items-center">
                                <div className="w-full md:w-24 h-24 bg-Gym ProyectGray rounded-lg flex items-center justify-center mb-4 md:mb-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-Gym ProyectYellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1 md:ml-6 text-center md:text-left">
                                    <h3 className="font-bold text-lg">Botella de Agua Gym Proyect</h3>
                                    <p className="text-gray-400 text-sm mb-2">750ml - Acero Inoxidable</p>
                                    <div className="flex items-center justify-center md:justify-start text-sm">
                                        <span className="text-gray-400">Cantidad:</span>
                                        <span className="ml-2 font-medium">1</span>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-center">
                                    <span className="text-Gym ProyectYellow font-bold text-xl mb-2">$19.99</span>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Preferences */}
                        <div className="card rounded-xl p-6">
                            <h3 className="font-bold text-lg mb-4">Preferencias de Entrega</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Instrucciones especiales</label>
                                    <textarea className="w-full bg-Gym ProyectBlack bg-opacity-50 border border-gray-700 rounded-lg p-3 text-white" rows="3" placeholder="Añade instrucciones especiales para la entrega...">Dejar con el portero. Edificio con acceso por intercom, preguntar por apartamento 4B.</textarea>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="leave-package" className="mr-2" defaultChecked />
                                    <label htmlFor="leave-package" className="text-sm">Dejar el paquete si no hay nadie en casa</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="signature" className="mr-2" defaultChecked />
                                    <label htmlFor="signature" className="text-sm">Requiere firma para la entrega</label>
                                </div>
                                <button className="bg-Gym ProyectYellow text-Gym ProyectBlack px-4 py-2 rounded-lg font-medium hover:bg-Gym ProyectDarkYellow transition btn-hover">
                                    Actualizar preferencias
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Calificación (Right Column) */}
                    <div className="lg:col-span-1 space-y-6 slide-in" style={{ animationDelay: '0.4s' }}>
                        <div className="card rounded-xl p-6">
                            <h3 className="font-bold text-lg mb-4">Califica tu Experiencia</h3>
                            <p className="text-gray-400 text-sm mb-4">Podrás calificar tu experiencia una vez que recibas tu pedido.</p>
                            <div className="flex items-center mb-4">
                                <span className="text-gray-400 text-sm mr-3">Calificación:</span>
                                <div className="flex">
                                    {renderRatingStars()}
                                </div>
                            </div>
                            {/* ... el resto del contenido de la columna derecha si hubiera más ... */}
                        </div>
                    </div>
                </div>
            </main>
            
            <EditAddressModal isOpen={isModalOpen} onClose={closeEditAddressModal} />
        </div>
    );
};

export default ShippingTracking;