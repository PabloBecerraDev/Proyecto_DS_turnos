// src/pages/TicketHistory/TicketHistoryPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import { getMyTickets } from '@/api/ticketService';
import { TicketResponseData } from '@/api/types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TicketHistoryPage: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<TicketResponseData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchTickets = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMyTickets();
        setTickets(data);
      } catch (err: any) {
        const errorMessage = err.response?.data?.detail || err.message || 'Error al cargar el historial de tickets.';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [auth.isAuthenticated, navigate]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleGoBack = () => {
    navigate('/home-user');
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">Cargando historial de tickets...</div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto p-4 md:p-8">
        {/* Botón de Regresar */}
        <button
          onClick={handleGoBack}
          className="mb-6 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Regresar
        </button>

        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">Historial de Tickets</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center" role="alert">
            <p><strong className="font-bold">Error:</strong> {error}</p>
          </div>
        )}

        {tickets.length === 0 && !loading && !error && (
          <p className="text-center text-gray-600">No tienes tickets en tu historial.</p>
        )}

        {tickets.length > 0 && (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Número
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Servicio
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Solicitud
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Modalidad
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {ticket.ticket_number}
                      {ticket.is_priority && <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Prioritario</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.service}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        ticket.status === 'PENDIENTE' ? 'bg-blue-100 text-blue-800' :
                        ticket.status === 'ATENDIDO' ? 'bg-green-100 text-green-800' :
                        ticket.status === 'CANCELADO' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {ticket.status_display || ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(ticket.created_at)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.modality_display || ticket.modality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default TicketHistoryPage;