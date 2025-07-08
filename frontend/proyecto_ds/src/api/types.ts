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



  export interface BaseUser {
    id: number;
    nombre: string;
    cedula: number;
    email: string;
    phone_number: string;
}

export interface Actor extends BaseUser {
    has_priority: boolean;
    motive: 'A' | 'B' | 'C' | 'D' | null;
}

export interface Worker extends BaseUser {
    code: string;
}


export type UserType = BaseUser | Actor | Worker;



