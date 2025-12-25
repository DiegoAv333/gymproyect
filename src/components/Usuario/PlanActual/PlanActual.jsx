import React from 'react';
import './PlanActual.css';
import { FaCrown, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';
import Planes from '../../planes/Planes'; // Importar el componente de Planes
import { useAuth } from '../../../hooks/useAuth';
import LoadingIndicator from '../../ui/LoadingIndicator/LoadingIndicator';

const PlanActual = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <LoadingIndicator />;
    }

    const userPlan = user ? user.plan : null;
    const hasActivePlan = user && user.hasActiveSubscription && userPlan && userPlan.name;

    return (
        <div className="plan-actual-container">
            <h2 className="text-2xl font-bold mb-6">Mi Plan Actual</h2>

            {hasActivePlan ? (
                <div className="card-plan-activo slide-in">
                    <div className="card-header">
                        <FaCrown className="text-Gym ProyectYellow text-3xl" />
                        <h3 className="text-xl font-bold">{userPlan.name}</h3>
                        <span className="status-badge active">Activo</span>
                    </div>
                    <div className="card-body">
                        <p className="vencimiento">Vence el: {userPlan.expirationDate}</p>
                        <h4 className="font-bold mt-6 mb-3">Beneficios Incluidos:</h4>
                        <ul className="beneficios-list">
                            {userPlan.benefits && userPlan.benefits.map((benefit, index) => (
                                <li key={index} className={benefit.included ? 'incluido' : 'no-incluido'}>
                                    {benefit.included ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
                                    <span>{benefit.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="card-footer">
                        <button className="btn-renovar">Renovar Plan</button>
                        <button className="btn-cambiar">Cambiar de Plan</button>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <div className="card-sin-plan slide-in">
                        <FaExclamationTriangle className="text-Gym ProyectYellow text-4xl mb-4" />
                        <h3 className="text-xl font-bold mb-2">No tienes un plan activo</h3>
                        <p className="text-gray-400">Elige uno de nuestros planes para empezar a disfrutar de los beneficios.</p>
                    </div>
                    <div className="mt-12">
                        <Planes />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlanActual;
