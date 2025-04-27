import React from 'react';
import './style.css'; // Importar archivo CSS

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>Sobre Nosotros</h1>
        <p>Conoce más sobre quiénes somos y nuestra misión.</p>
      </div>
      <div className="about-content">
        <div className="section">
          <h2>Misión</h2>
          <p>
            Nuestra misión es proporcionar soluciones innovadoras para mejorar la
            vida de nuestros clientes a través de tecnología de punta y un servicio
            excepcional.
          </p>
        </div>
        <div className="section">
          <h2>Visión</h2>
          <p>
            Ser una empresa líder en el sector, reconocida por su compromiso con la
            calidad, la innovación y el respeto al medio ambiente.
          </p>
        </div>
        <div className="section">
          <h2>Equipo</h2>
          <p>
            Nuestro equipo está formado por profesionales apasionados por la
            tecnología, la creatividad y la innovación, comprometidos con ofrecer
            los mejores resultados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
