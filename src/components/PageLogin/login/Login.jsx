import React, { useState, useEffect } from 'react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import EmailForm from '../MailForm/EmailForm';
import { useEmailAuth } from '../../../hooks/useEmailAuth';
import { useGoogleAuth } from '../../../hooks/useGoogleAuth';
import { useFacebookAuth } from '../../../hooks/useFacebookAuth';
import ErrorModal from '../../ui/ErrorModal/ErrorModal';

const Login = () => {
    const { login, error: emailError } = useEmailAuth();
    const { loginWithGoogle } = useGoogleAuth();
    const { loginWithFacebook } = useFacebookAuth();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (emailError) {
            setError(emailError.message);
        }
    }, [emailError]);

    const handleEmailLogin = async (email, password) => {
        try {
            await login(email, password);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleFacebookLogin = async () => {
        try {
            await loginWithFacebook();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <ErrorModal 
                isOpen={!!error}
                onClose={() => setError(null)}
                errorMessage={error}
            />
            <div className="social-login">
                <button type="button" onClick={handleGoogleLogin}>
                    <FaGoogle />
                    <span>Continuar con Google</span>
                </button>
                <button type="button" onClick={handleFacebookLogin}>
                    <FaFacebookF />
                    <span>Continuar con Facebook</span>
                </button>
            </div>
            <EmailForm
                onSubmit={handleEmailLogin}
                buttonText="Iniciar Sesión"
                formType="login"
            />
        </>
    );
};

export default Login;