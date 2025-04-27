export interface CreateUserWorkerPayload {
    cedula: number;
    password: string;
    nombre: string;
    email: string;
    phone_number: number;
    code: number;
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