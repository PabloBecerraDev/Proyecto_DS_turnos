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
  service: string; 
}

export interface TicketResponseData {
  id: number;
  user: number; 
  service: string;
  is_priority: boolean; 
  ticket_number: string; 
  status: string; 
  created_at: string; 
  updated_at: string; 
  user_username?: string; 
  status_display?: string; 
}

export interface JwtPayload {
  token_type?: string; 
  exp?: number;        
  iat?: number;        
  jti?: string;      
  id: number;          
  cedula: number;      
  nombre: string;
  role: 'actor' | 'worker' | 'user';
}
