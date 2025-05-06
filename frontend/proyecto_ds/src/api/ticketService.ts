import api from './axios'; 
import { TicketRequestData, TicketResponseData } from './types'; 

export const requestTicket = async (service: string): Promise<TicketResponseData> => {
  const requestData: TicketRequestData = { service };

  console.log("Enviando solicitud para crear ticket:", requestData); 
  try {
    const response = await api.post<TicketResponseData>('/tickets/', requestData);

    console.log("Respuesta de creación de ticket:", response.data); 
    return response.data;
  } catch (error: any) {
    console.error("Error en la API al solicitar ticket:", error.response?.data || error.message); 
    throw error;
  }
};

// Funciones API relacionadas con tickets en el futuro
// export const getMyTickets = async (): Promise<TicketResponseData[]> => { ... }
// export const cancelTicket = async (ticketId: number): Promise<void> => { ... }