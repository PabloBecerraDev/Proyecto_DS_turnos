import React, { useState } from 'react';
import './style.css';

const Turns = () => {
  const [currentTurn, setCurrentTurn] = useState('A101'); // Solo el turno actual
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketStatus, setTicketStatus] = useState('Pending');
  const [currentTicket, setCurrentTicket] = useState<{
    description: string;
    status: string;
  } | null>(null);

  // Maneja la creación de un ticket
  const handleTicketCreate = (event: React.FormEvent) => {
    event.preventDefault();

    // Verifica si ya existe un ticket pendiente
    if (ticketStatus === 'Pending' && currentTicket && currentTicket.status === 'Pending') {
      alert('Ya existe un ticket pendiente. Solo puede haber uno pendiente a la vez.');
      return;
    }

    const newTicket = {
      description: ticketDescription,
      status: ticketStatus,
    };

    setCurrentTicket(newTicket);  // Guarda el ticket como el actual
    setTicketDescription('');     // Limpiar campo de descripción
  };

  return (
    <div className="background">
      <div className="ticketContainer">
        <div className="turnInfo">
          <h2>Turno cola: {currentTurn}</h2>
        </div>

        <div className="ticketForm">
          <h3>Crear Ticket</h3>
          <form onSubmit={handleTicketCreate}>
            <div className="ticketField">
              <label>Descripción del Ticket</label>
              <input
                type="text"
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
                required
              />
            </div>
            <div className="ticketField">
              <label>Estado</label>
              <select
                value={ticketStatus}
                onChange={(e) => setTicketStatus(e.target.value)}
              >
                <option value="Pending">Pendiente</option>
                <option value="Completed">Completado</option>
              </select>
            </div>
            <button type="submit">Crear Ticket</button>
          </form>
        </div>

        <div className="currentTicketSection">
          {/* <h3>Ticket</h3> */}
          {currentTicket ? (
            <div className="ticket">
              <span>{currentTicket.description} - {currentTicket.status}</span>
            </div>
          ) : (
            <p>No tiene ticket pendiente.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Turns;
