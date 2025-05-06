export interface CreateUserWorkerPayload {
    cedula: number;
    password: string;
    nombre: string;
    email: string;
    phone_number: number;
}

export type CreateUserWorkerResponse = {
    id: number;
    nombre: string;
    cedula: number;
    email: string;
    phone_number: number;
    code: string;
}


export interface ActorPayload {
    nombre: string;
    cedula: number;
    email: string;
    phone_number: string;
    password: string;
    has_priority: boolean;
    motive?: "A" | "B" | "C" | "D"; 
}

export type ActorResponse = {
    nombre: string;
    cedula: number;
    email: string;
    phone_number: string;
    password: string;
    has_priority: boolean;
    motive: "A" | "B" | "C" | "D" | null;
  };

export interface TicketRequestData {
  service: string; // Solo el servicio seleccionado o escrito
}

export interface TicketResponseData {
  id: number;
  user: number; // ID del usuario que solicitó
  service: string;
  is_priority: boolean; // Prioridad determinada por el backend
  ticket_number: string; // El número de ticket generado (Ej: "N-001")
  status: string; // El estado inicial (Ej: "PENDIENTE")
  created_at: string; // Fecha ISO 8601
  updated_at: string; // Fecha ISO 8601
  user_username?: string; // El nombre de usuario (cedula) - Opcional si se añadió al serializer
  status_display?: string; // El nombre legible del estado - Opcional si se añadió al serializer
}

