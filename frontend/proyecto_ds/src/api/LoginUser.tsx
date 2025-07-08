import { setTokens } from "@/utils/tokenUtils";
import api from "./axios";
import { LoginPayLoad, LoginResponse } from "@/auth/authService";
import { getUserData } from "@/api/getUserById";
import {jwtDecode} from "jwt-decode";


type DecodedToken = {
    user_id: number;
};



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
        // setActualId(access);
    
        const decoded: DecodedToken = jwtDecode(access);
        const userId = decoded.user_id;
        console.log(userId)

        await getUserData(userId);
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



export default LoginUser;
