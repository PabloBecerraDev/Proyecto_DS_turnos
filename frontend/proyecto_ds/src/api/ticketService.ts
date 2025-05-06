import api from './axios';
import { TicketRequestData, TicketResponseData } from './types';

/**
 * Llama al endpoint del backend para solicitar (crear) un nuevo ticket.
 * @param data - Objeto con el servicio y la modalidad.
 * @returns Una promesa que resuelve con los datos del ticket creado.
 */
export const requestTicket = async (service: string, modality: 'VIRTUAL' | 'PRESENCIAL'): Promise<TicketResponseData> => {
  const requestData: TicketRequestData = { service, modality };
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

export const getMyTickets = async (): Promise<TicketResponseData[]> => {
  console.log("Enviando solicitud para obtener mis tickets..."); // Log para depuración

  try {
    // Realiza la petición GET a la URL '/tickets/'
    // La instancia 'api' ya tiene el interceptor que añade el token de autorización.
    const response = await api.get<TicketResponseData[]>('/tickets/');

    console.log("Respuesta de mis tickets:", response.data); // Log para depuración
    return response.data; // Devuelve el array de tickets
  } catch (error: any) {
    console.error("Error en la API al obtener mis tickets:", error.response?.data || error.message);
    throw error;
  }
};