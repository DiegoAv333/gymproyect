import React from 'react';
import './ErrorModal.css';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorModal = ({ isOpen, onClose, errorMessage }) => {
    if (!isOpen) {
        return null;
    }

    // Mapeo de errores de Firebase a mensajes amigables
    const getFriendlyErrorMessage = (message) => {
        if (message.includes('auth/invalid-email')) {
            return 'El formato del correo electronico no es valido.';
        }
        if (message.includes('auth/user-not-found') || message.includes('auth/wrong-password')) {
            return 'Correo electronico o contraseña incorrectos.';
        }
        if (message.includes('auth/email-already-in-use')) {
            return 'Este correo electronico ya esta registrado.';
        }
        if (message.includes('auth/weak-password')) {
            return 'La contraseña debe tener al menos 6 caracteres.';
        }
        return 'Ocurrio un error inesperado. Por favor, intantalo de nuevo.';
    };

    const friendlyMessage = getFriendlyErrorMessage(errorMessage);

    return (
        <div className="error-modal-overlay">
            <div className="error-modal-content">
                <div className="error-modal-header">
                    <FaExclamationTriangle className="error-icon" />
                    <h3>Error de Autenticacion</h3>
                </div>
                <p className="error-message-text">{friendlyMessage}</p>
                <button onClick={onClose} className="error-modal-close-btn">
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default ErrorModal;
