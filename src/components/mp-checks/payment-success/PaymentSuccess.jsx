import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/usuario');
        }, 3000); // Redirect after 3 seconds

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="payment-success-container">
            <div className="payment-success-card">
                <h2>¡Pago Exitoso!</h2>
                <p>Tu pago ha sido procesado correctamente.</p>
                <p>Gracias por tu compra. Serás redirigido a tu panel en breve.</p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
