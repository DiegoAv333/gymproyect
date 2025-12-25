import React, { useState } from 'react';
import './ShippingForm.css';
import { FaUser, FaMapMarkerAlt, FaCity, FaGlobe, FaPhone, FaMailBulk } from 'react-icons/fa';

const ShippingForm = ({ onShippingSubmit }) => {
    const [shippingData, setShippingData] = useState({
        fullName: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'México',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí podrías agregar validación de datos antes de enviarlos
        console.log('Datos de envío:', shippingData);
        onShippingSubmit(shippingData);
    };

    return (
        <div className="shipping-form-container card rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center">
                <FaMapMarkerAlt className="mr-3 text-Gym ProyectYellow" />
                Información de Envío
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="form-group">
                        <label htmlFor="fullName" className="form-label"><FaUser className="mr-2" />Nombre Completo</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            className="form-input"
                            placeholder="Juan Pérez"
                            value={shippingData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div className="form-group">
                        <label htmlFor="phone" className="form-label"><FaPhone className="mr-2" />Teléfono</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="form-input"
                            placeholder="55 1234 5678"
                            value={shippingData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Address */}
                <div className="form-group mt-6">
                    <label htmlFor="address" className="form-label"><FaMailBulk className="mr-2" />Dirección</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        className="form-input"
                        placeholder="Av. Siempre Viva 742, Col. Springfield"
                        value={shippingData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {/* City */}
                    <div className="form-group">
                        <label htmlFor="city" className="form-label"><FaCity className="mr-2" />Ciudad</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            className="form-input"
                            placeholder="Ciudad de México"
                            value={shippingData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* State */}
                    <div className="form-group">
                        <label htmlFor="state" className="form-label"><FaMapMarkerAlt className="mr-2" />Estado / Provincia</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            className="form-input"
                            placeholder="CDMX"
                            value={shippingData.state}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Postal Code */}
                    <div className="form-group">
                        <label htmlFor="postalCode" className="form-label"><FaMapMarkerAlt className="mr-2" />Código Postal</label>
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            className="form-input"
                            placeholder="01234"
                            value={shippingData.postalCode}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                
                {/* Country */}
                <div className="form-group mt-6">
                    <label htmlFor="country" className="form-label"><FaGlobe className="mr-2" />País</label>
                    <select 
                        id="country" 
                        name="country" 
                        className="form-input"
                        value={shippingData.country}
                        onChange={handleChange}
                    >
                        <option value="México">México</option>
                        <option value="España">España</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Colombia">Colombia</option>
                    </select>
                </div>

                <div className="mt-8 text-right">
                    <button type="submit" className="w-full md:w-auto bg-Gym ProyectYellow text-Gym ProyectBlack py-3 px-8 rounded-lg font-bold hover:bg-Gym ProyectDarkYellow transition btn-hover">
                        Guardar y Continuar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ShippingForm;
