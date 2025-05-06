// src/api/ticketService.ts

import api from './axios'; // Importa la instancia configurada de Axios
import { TicketRequestData, TicketResponseData } from './types'; // Importa los tipos desde el archivo central

/**
 * Llama al endpoint del backend para solicitar (crear) un nuevo ticket.
 *
 * @param service El servicio seleccionado o ingresado por el usuario.
 * @returns Una promesa que resuelve con los datos del ticket creado.
 */
export const requestTicket = async (service: string): Promise<TicketResponseData> => {
  // Prepara el cuerpo de la solicitud según la interfaz TicketRequestData
  const requestData: TicketRequestData = { service };

  console.log("Enviando solicitud para crear ticket:", requestData); // Log para depuración

  try {
    // Realiza la petición POST a la URL '/tickets/' usando la instancia 'api'.
    // La instancia 'api' ya tiene el interceptor que añade el token de autorización.
    // Especificamos el tipo de la respuesta esperada (<TicketResponseData>)
    const response = await api.post<TicketResponseData>('/tickets/', requestData);

    console.log("Respuesta de creación de ticket:", response.data); // Log para depuración
    // Devuelve los datos del ticket creado (el cuerpo de la respuesta)
    return response.data;
  } catch (error: any) {
    // Si ocurre un error en la llamada API...
    console.error("Error en la API al solicitar ticket:", error.response?.data || error.message); // Log del error
    // Relanza el error para que el componente que llama pueda manejarlo (mostrar UI de error)
    throw error;
  }
};

// Podrías añadir aquí otras funciones API relacionadas con tickets en el futuro
// export const getMyTickets = async (): Promise<TicketResponseData[]> => { ... }
// export const cancelTicket = async (ticketId: number): Promise<void> => { ... }