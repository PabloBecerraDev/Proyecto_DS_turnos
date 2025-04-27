import { setActualUser, setTokens, clearTokens } from "@/utils/tokenUtils";
import api from "./axios";
import { LoginPayLoad, LoginResponse } from "@/auth/authService";

const LoginUser = async (data: LoginPayLoad): Promise<void> => {  
    try {
        const response = await api.post<LoginResponse>("users/login/", data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const { access, refresh } = response.data;
        setTokens(access, refresh);
        console.log('Access Token:', access);
        setActualUser(access);
        
        console.log(response.data);
    } catch (error: any) {
        if (error.response) {
            console.error('Error del backend:', error.response.data);
        } else {
            console.error('Error al conectar con el servidor:', error.message);
        }
        throw error;
    }
};

export const logout = () => {
    clearTokens();
};

export default LoginUser;
