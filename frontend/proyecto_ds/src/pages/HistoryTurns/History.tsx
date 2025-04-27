import React, { useState, useEffect } from 'react';
import './style.css';

const TicketHistory = () => {
  // Simulando los datos de tickets previos
  const [ticketHistory, setTicketHistory] = useState<
    { description: string; status: string; createdAt: string }[]
  >([]);
  
  const [selectedTicket, setSelectedTicket] = useState<{
    description: string;
    status: string;
    createdAt: string;
  } | null>(null);

  const [editedDescription, setEditedDescription] = useState<string>('');
  const [menuVisible, setMenuVisible] = useState<boolean>(false); // Control de visibilidad del menú

  // Simulando la carga de datos de tickets
  useEffect(() => {
    const loadTicketHistory = () => {
      const tickets = [
        {
            description: 'Solicitud de soporte técnico',
            status: 'Pending',
            createdAt: '2025-04-21 09:15',
        },
        {
          description: 'Problema con la red',
          status: 'Completed',
          createdAt: '2025-04-20 14:30',
        },
        {
          description: 'Error en el sistema',
          status: 'Completed',
          createdAt: '2025-04-19 17:45',
        },
      ];

      setTicketHistory(tickets); // Establecer los tickets simulados
    };

    loadTicketHistory();
  }, []);

  // Función para editar el ticket
  const handleEditTicket = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (selectedTicket) {
      const updatedTicket = {
        ...selectedTicket,
        description: editedDescription || selectedTicket.description,
      };
      
      // Actualizamos el historial con la descripción editada
      setTicketHistory((prevHistory) =>
        prevHistory.map((ticket) =>
          ticket.createdAt === selectedTicket.createdAt ? updatedTicket : ticket
        )
      );
      setSelectedTicket(updatedTicket); // Actualizamos el ticket actual
      setEditedDescription(''); // Limpiamos la descripción editada
      setMenuVisible(false); // Cerramos el menú
    }
  };

  // Función para eliminar el ticket
  const handleDeleteTicket = () => {
    if (selectedTicket) {
      setTicketHistory((prevHistory) =>
        prevHistory.filter((ticket) => ticket.createdAt !== selectedTicket.createdAt)
      );
      setSelectedTicket(null); // Limpiamos el ticket actual
      setMenuVisible(false); // Cerramos el menú
    }
  };

  return (
    <div className="background">
      <div className="ticketContainer">
        <div className="turnInfo">
          <h2>Historial de Tickets</h2>
        </div>

        <div className="ticketHistorySection">
          <h3>Todos los Tickets Creado</h3>
          {ticketHistory.length > 0 ? (
            <ul>
              {ticketHistory.map((ticket, index) => (
                <li
                  key={index}
                  className="ticketHistoryItem"
                  onMouseEnter={() => {
                    if (ticket.status === 'Pending') setMenuVisible(true);
                  }}
                  onMouseLeave={() => setMenuVisible(false)}
                >
                  <div className="ticketContent">
                    <span>{ticket.description}</span> -{' '}
                    <strong>{ticket.status}</strong> -{' '}
                    <em>{ticket.createdAt}</em>
                    {ticket.status === 'Pending' && menuVisible && (
                      <div className="threeDotsMenu">
                        <span
                          className="menuIcon"
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          &#x22EE; {/* Tres puntos */}
                        </span>
                        {selectedTicket?.createdAt === ticket.createdAt && (
                          <div className="menuOptions">
                            <form onSubmit={handleEditTicket}>
                              <div className="ticketField">
                                <label>Descripción</label>
                                <input
                                  type="text"
                                  value={editedDescription || ticket.description}
                                  onChange={(e) => setEditedDescription(e.target.value)}
                                />
                              </div>
                              <button type="submit">Guardar Cambios</button>
                            </form>
                            <button onClick={handleDeleteTicket}>Eliminar Ticket</button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay tickets en el historial.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketHistory;
