import React, { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { updateUserProfile, requestPasswordReset } from './useUsuarios'; // Importar funciÃ³n de reseteo
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '../components/ui/LoadingIndicator/LoadingIndicator';
import './UpdateProfileForm.css';

const UpdateProfileForm = () => {
    const { user, loading } = useAuth();
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [resetMessage, setResetMessage] = useState(''); // Estado para el mensaje de reseteo
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user) {
            setDisplayName(user.displayName || '');
        }
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setIsUpdating(true);

        if (!displayName.trim()) {
            setError('El nombre no puede estar vacÃ­o.');
            setIsUpdating(false);
            return;
        }

        try {
            await updateUserProfile(user.uid, { displayName: displayName.trim() });
            setSuccess('¡Tu nombre ha sido actualizado exitosamente!');
        } catch (err) {
            console.error('Error al actualizar el perfil:', err);
            setError('Error al actualizar el perfil. Intentalo de nuevo.');
        } finally {
            setIsUpdating(false);
        }
    };

    const handlePasswordReset = async () => {
        setError(null);
        setSuccess(null);
        setResetMessage('');
        try {
            await requestPasswordReset(user.email);
            setResetMessage(`Se ha enviado un correo de recuperacion a ${user.email}.`);
        } catch (err) {
            console.error('Error al enviar correo de restablecimiento:', err);
            setError('No se pudo enviar el correo de restablecimiento. Intentalo de nuevo.');
        }
    };

    if (loading || !user) {
        return <LoadingIndicator />;
    }

    return (
        <div className="update-profile-container">
            <form onSubmit={handleSubmit} className="update-profile-form">
                <h2>Informacion Personal</h2>
                {success && <p className="success-message">{success}</p>}
                {error && <p className="error-message">{error}</p>}

                <div className="form-group">
                    <label htmlFor="displayName">Nombre:</label>
                    <input
                        type="text"
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Ingresa tu nombre"
                        disabled={isUpdating}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Correo Electronico:</label>
                    <input
                        type="email"
                        id="email"
                        value={user.email || ''}
                        disabled
                    />
                </div>

                <button type="submit" disabled={isUpdating}>
                    {isUpdating ? 'Actualizando...' : 'Guardar Cambios'}
                </button>
            </form>

            <div className="security-section">
                <h2>Seguridad de la Cuenta</h2>
                {resetMessage && <p className="success-message">{resetMessage}</p>}
                <div className="form-group">
                    <label>Contraseña:</label>
                    <button type="button" className="secondary-button" onClick={handlePasswordReset}>
                        Enviar correo para cambiar contraseña
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfileForm;
