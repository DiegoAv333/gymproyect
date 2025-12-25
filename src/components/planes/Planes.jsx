import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Planes.css';
import { FaCheck } from 'react-icons/fa';
import usePlanes from '../../hooks/usePlanes';

const Planes = () => {
    const { cartItems, addToCart, removeFromCart } = useCart();
    const { planes } = usePlanes();
    const navigate = useNavigate();

    const handleSelectPlan = (plan) => {
        // Encuentra si ya existe un plan en el carrito
        const existingPlan = cartItems.find(item => item.type === 'plan');

        // Si existe, lo remueve
        if (existingPlan) {
            removeFromCart(existingPlan.id);
        }

        // AÃ±ade el nuevo plan (asegurando cantidad 1) y redirige
        addToCart({ ...plan, type: 'plan', quantity: 1 });
        navigate('/usuario/checkout'); // Redirige a la pÃ¡gina de checkout
    };

    const currentPlanInCart = cartItems.find(item => item.type === 'plan');

    return (
        <div className="planes-container">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold">Elige el Plan Perfecto para Ti</h1>
                <p className="text-gray-400 mt-2">Unete a la comunidad Gym Proyect y alcanza tus metas.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {planes && planes.map((plan, index) => {
                    const isSelected = currentPlanInCart && currentPlanInCart.id === plan.id;
                    return (
                        <div key={plan.id} className={`plan-card ${plan.isFeatured ? 'featured' : ''} ${isSelected ? 'selected' : ''}`}>
                            {plan.isFeatured && <div className="featured-badge">Mas Popular</div>}
                            <div className="p-8">
                                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                                <p className="text-gray-400 mb-6">{plan.description}</p>
                                <div className="price-container mb-6">
                                    <span className="price-currency">$</span>
                                    <span className="price-amount">{plan.price}</span>
                                    <span className="price-period">/mes</span>
                                </div>
                                <ul className="features-list mb-8">
                                    {plan.features && plan.features.map((feature, featureIndex) => (
                                        <li key={`${plan.id}-${featureIndex}`} className="flex items-center mb-3">
                                            <FaCheck className="text-Gym ProyectYellow mr-3" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button 
                                    onClick={() => handleSelectPlan(plan)} 
                                    className={`plan-button ${plan.isFeatured ? 'btn-featured' : ''} ${isSelected ? 'btn-selected' : ''}`}
                                    disabled={isSelected}
                                >
                                    {isSelected ? 'Plan Seleccionado' : 'Seleccionar Plan'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Planes;