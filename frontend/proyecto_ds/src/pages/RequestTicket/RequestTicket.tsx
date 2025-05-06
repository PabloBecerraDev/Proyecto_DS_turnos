import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext'; 
import { requestTicket } from '@/api/ticketService'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useMediaQuery from '@/hooks/useMediaQuery'; 


const serviceOptions = [
  { value: 'ASESORIA', label: 'Asesoría General' },
  { value: 'PAGO_FACTURA', label: 'Pago de Factura' },
  { value: 'RADICACION', label: 'Radicación de Documentos' },
  { value: 'CONSULTA', label: 'Consulta Específica' },
  { value: 'OTRO', label: 'Otro Servicio' },
];

interface SuccessData {
  ticketNumber: string;
}

const RequestTicketPage: React.FC = () => {
  const authContext = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [selectedService, setSelectedService] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successData, setSuccessData] = useState<SuccessData | null>(null);

  useEffect(() => {
    if (!authContext.isAuthenticated) {
      console.warn('RequestTicketPage: Usuario no autenticado detectado por useEffect, redirigiendo...');
      navigate('/login'); 
    }
  }, [authContext.isAuthenticated, navigate]); 

  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedService) {
      toast.warn('Por favor, seleccione un servicio.');
      return;
    }

    setIsLoading(true);
    setSuccessData(null);

    try {
      const response = await requestTicket(selectedService);
      setSuccessData({ ticketNumber: response.ticket_number });
      setSelectedService(''); 
    } catch (err: any) {
      console.error('Fallo al solicitar ticket:', err);
      const errorMessage =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        (typeof err.response?.data === 'string' ? err.response.data : null) ||
        err.message ||
        'Ocurrió un error inesperado al solicitar el ticket.';
      toast.error(errorMessage); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptSuccess = () => {
    setSuccessData(null); 
    navigate('/home-user');
  };

  // --- Renderizado ---
  if (successData) {
    return (
      <section className='flex min-h-screen items-center justify-center p-4'>
        <ToastContainer position={isMobile ? "top-center" : "top-right"} autoClose={3000} limit={isMobile ? 2 : 5} />
        <div className="container mx-auto p-8 max-w-md bg-white rounded-2xl shadow-lg text-center border border-green-200">
          <h2 className="text-2xl font-bold mb-6 text-green-700">¡Turno solicitado con éxito!</h2>
          <p className="text-lg mb-4 text-gray-700">Su número de turno asignado es:</p>
          <p className="text-5xl font-bold mb-8 text-blue-700 bg-blue-50 py-3 rounded-md">
            {successData.ticketNumber}
          </p>
          <button
            onClick={handleAcceptSuccess}
            className="w-full bg-stone-400 hover:bg-stone-500 text-white font-bold py-3 px-4 rounded-xl hover:scale-105 duration-300"
          >
            Aceptar
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className='flex min-h-screen items-center justify-center p-4'>
      <ToastContainer position={isMobile ? "top-center" : "top-right"} autoClose={3000} limit={isMobile ? 2 : 5} />
      {}
      <div className={`flex flex-col bg-stone-100 rounded-2xl shadow-lg ${isMobile ? "w-[90%]" : "max-w-md"} w-full p-8`}>
        <h2 className="font-bold text-2xl text-center mb-6 text-gray-800">Solicitar Turno</h2>

        <form onSubmit={handleSubmit} className='flex flex-col w-full gap-6'>
          <div>
            <label htmlFor="service" className="block text-gray-700 text-sm font-bold mb-2">
              Seleccione el servicio requerido:
            </label>
            <select
              id="service"
              value={selectedService}
              onChange={handleServiceChange}
              className={`p-3 rounded-xl bg-gray-300 w-full appearance-none focus:outline-none focus:ring-2 focus:ring-stone-400`}
              required
            >
              <option value="" disabled>-- Por favor seleccione un servicio --</option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {}

          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              disabled={isLoading || !selectedService}
              className={`w-full py-3 px-4 text-white rounded-xl hover:scale-105 duration-300 font-semibold ${isLoading || !selectedService ? 'bg-gray-400 cursor-not-allowed' : 'bg-stone-400 hover:bg-stone-500'}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  {}
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Solicitando...
                </span>
              ) : (
                'Solicitar Turno'
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RequestTicketPage;