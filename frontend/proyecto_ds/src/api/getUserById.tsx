import { setActualUser } from "@/utils/tokenUtils";
import api from "./axios";
import { UserType } from "@/api/types";

export const getUserData = async (userId: number): Promise<UserType> => {
    try {
        const response = await api.get<UserType>(`/users/get/${userId}/`);
        setActualUser(response.data)
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error("Error del backend:", error.response.data);
        } else {
            console.error("Error de red:", error.message);
        }
        throw error;
    }
};
