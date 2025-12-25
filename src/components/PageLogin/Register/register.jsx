import React, { useState, useEffect } from 'react';
import { useEmailAuth } from '../../../hooks/useEmailAuth';
import { useGoogleAuth } from '../../../hooks/useGoogleAuth';
import { useFacebookAuth } from '../../../hooks/useFacebookAuth';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import EmailForm from '../MailForm/EmailForm';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import ErrorModal from '../../ui/ErrorModal/ErrorModal';

const Register = () => {
    const navigate = useNavigate();
    const { signup, loading: emailLoading, error: emailError } = useEmailAuth();
    const { loginWithGoogle, loading: googleLoading } = useGoogleAuth();
    const { loginWithFacebook, loading: facebookLoading } = useFacebookAuth();
    const { user } = useAuth();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (emailError) {
            setError(emailError.message);
        }
    }, [emailError]);

    const handleEmailRegister = async (nombre, email, password) => {
        try {
            await signup(nombre, email, password);
            navigate('/usuario');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSocialRegister = async (loginProvider) => {
        try {
            await loginProvider();
            navigate('/usuario');
        } catch (err) {
            setError(err.message);
        }
    };

    if (user) return null;

    return (
        <>
            <ErrorModal 
                isOpen={!!error}
                onClose={() => setError(null)}
                errorMessage={error}
            />
            <div className="social-login">
                <button type="button" onClick={() => handleSocialRegister(loginWithGoogle)} disabled={googleLoading}>
                    <FaGoogle />
                    <span>Regístrate con Google</span>
                </button>
                <button type="button" onClick={() => handleSocialRegister(loginWithFacebook)} disabled={facebookLoading}>
                    <FaFacebookF />
                    <span>Regístrate con Facebook</span>
                </button>
            </div>
            <EmailForm
                onSubmit={handleEmailRegister}
                buttonText={emailLoading ? "Registrando..." : "Registrarse"}
                formType="register"
            />
        </>
    );
};

export default Register;