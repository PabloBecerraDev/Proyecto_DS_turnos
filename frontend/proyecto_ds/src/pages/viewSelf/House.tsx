import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

// Simulamos la obtención de datos del usuario
const fetchUserProfile = async () => {
  return {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
  };
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUserProfile = async () => {
      const profile = await fetchUserProfile();
      setUser(profile);
    };
    getUserProfile();
  }, []);

  return (
    <div className="profile-container">
      {/* Cabecera con nombre y correo */}
      <div className="header">
        <h1>Bienvenido, {user?.name}</h1>
        <p className="email">{user?.email}</p>
      </div>

      {/* Sección de menú de opciones */}
      <div className="menu">
        <div className="card" onClick={() => navigate('/turns')}>
          <h3>Solicitar Nuevo Turno</h3>
          <p>Accede para solicitar un turno en el sistema.</p>
        </div>
        <div className="card" onClick={() => navigate('/history')}>
          <h3>Ver Historial de Tickets</h3>
          <p>Consulta el estado de tus tickets anteriores.</p>
        </div>
        <div className="card" onClick={() => navigate('/profile')}>
          <h3>Mis Datos</h3>
          <p>Gestiona y edita tus datos personales.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
