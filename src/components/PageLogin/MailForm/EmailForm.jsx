import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const EmailForm = ({ onSubmit, buttonText, formType }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        const passwordInput = document.getElementById(`password-${formType}`);
        passwordInput.type = showPassword ? 'password' : 'text';
        passwordInput.focus();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formType === 'register') {
            onSubmit(name, email, password);
        } else {
            onSubmit(email, password);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="email-form">
            {formType === 'register' && (
                <div className="form-group">
                    <label htmlFor="name-register">Nombre Completo</label>
                    <input
                        id="name-register"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Tu nombre y apellido"
                    />
                </div>
            )}
            <div className="form-group">
                <label htmlFor={`email-${formType}`}>Correo Electrónico</label>
                <input
                    id={`email-${formType}`}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="tu@email.com"
                />
            </div>
            <div className="form-group">
                <label htmlFor={`password-${formType}`}>Contraseña</label>
                <div className="password-input-container">
                    <input
                        id={`password-${formType}`}
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Contraseña-1234"
                    />
                    <button
                        id="show-password"
                        type="button"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                    </button>
                </div>
            </div>
            {formType === 'login' && (
                <div className="options">
                    <label htmlFor="remember">
                        <input id="remember" type="checkbox" />
                        Recordarme
                    </label>
                    <Link to="/forgot-password" className="forgot-password">¿Olvidaste tu contraseña</Link>
                </div>
            )}
            <button type="submit">{buttonText}</button>
        </form>
    );
};

export default EmailForm;
