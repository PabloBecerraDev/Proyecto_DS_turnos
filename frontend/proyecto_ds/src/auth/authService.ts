export interface LoginPayLoad {
    cedula: string;
    password: string;
}

export interface LoginResponse{
    refresh: string;
    access: string;
}