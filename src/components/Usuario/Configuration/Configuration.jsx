import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import UpdateProfileForm from '../../../hooks/UpdateProfileForm';
import './Configuration.css';
import { FaArrowLeft } from 'react-icons/fa';

const Configuration = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="configuration-container">
      {user && (user.role === 'Admin' || user.role === 'Ventas') && (
        <button 
          onClick={() => navigate(-1)} 
          className="back-button-config"
        >
          <FaArrowLeft /> Volver
        </button>
      )}
      <UpdateProfileForm />
    </div>
  );
};

export default Configuration;
