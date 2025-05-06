import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Navbar from '@/pages/navbar/navbar';
import { JwtPayload } from '@/api/types';

const HomeUserPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const storedUserPayload = localStorage.getItem("usuario");
    if (storedUserPayload) {
      try {
        const parsedPayload = JSON.parse(storedUserPayload) as JwtPayload;
        setUser(parsedPayload);
        if (!['actor', 'worker', 'user'].includes(parsedPayload.role)) {
            console.warn("Rol de usuario no reconocido en payload:", parsedPayload.role);
        }
      } catch (e) {
        console.error("Error parseando datos del usuario desde localStorage:", e);
      }
    } else {
      console.warn("No se encontró payload de usuario en localStorage. Redirigiendo a login.");
    }
  }, []);

  const renderUserMenu = () => {
    if (!user || !user.role) {
      return <p className="text-center text-gray-600">Cargando opciones de menú...</p>;
    }

    if (user.role === 'worker') {
      return (
        <div className="menu">
          <div className="card" onClick={() => navigate('/manage-accesspoint')}>
            <h3>Gestionar Fila</h3>
            <p>Cambia el estado de un punto de atención.</p>
          </div>
          <div className="card" onClick={() => navigate('/register')}>
            <h3>Registrar Usuario</h3>
            <p>Registra nuevos usuarios en el sistema.</p>
          </div>
          <div className="card" onClick={() => navigate('/register-worker')}>
            <h3>Registrar Trabajador</h3>
            <p>Registra nuevos trabajadores en el sistema.</p>
          </div>
          <div className="card" onClick={() => navigate('/manage-userdata')}>
            <h3>Editar Usuario</h3>
            <p>Gestiona los datos de un usuario del sistema.</p>
          </div>
        </div>
      );
    }
    else if (user.role === 'actor') {
      return (
        <div className="menu">
          <div className="card" onClick={() => navigate('/solicitar-turno')}>
            <h3>Solicitar Nuevo Turno</h3>
            <p>Accede para solicitar un turno en el sistema.</p>
          </div>
          <div className="card" onClick={() => navigate('/history')}>
            <h3>Ver Historial de Tickets</h3>
            <p>Consulta el estado de tus tickets anteriores.</p>
          </div>
          <div className="card" onClick={() => navigate('/personal-data')}>
            <h3>Mis Datos</h3>
            <p>Gestiona y edita tus datos personales.</p>
          </div>
        </div>
      );
    }

    return <p className="text-center text-red-500">Rol de usuario no reconocido ('{user.role}'). No hay opciones de menú.</p>;
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="profile-container mt-10 text-center">
          <p>Cargando información del perfil...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile-container mt-10">
        <div className="header">
          <h1>Bienvenido, {user.nombre || 'Usuario'}</h1>
          <p className="email">{user.cedula || 'Cedula no disponible'}</p>
        </div>

        {renderUserMenu()}
      </div>
    </>
  );
};

export default HomeUserPage;