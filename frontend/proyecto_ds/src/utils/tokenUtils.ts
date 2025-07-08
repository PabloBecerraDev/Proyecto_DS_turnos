import {jwtDecode} from "jwt-decode";
import {UserType } from "@/api/types";

export const setTokens = (access: string, refresh: string) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
};

// export const setActualUser = (access:string) => {
//     const userDecode = jwtDecode(access);
//     localStorage.setItem("usuario", JSON.stringify(userDecode));
// };

export const setActualUser = (user: UserType) => {
    let role: 'actor' | 'worker' | 'user' = 'user';

    if ('has_priority' in user) {
        role = 'actor';
    } else if ('code' in user) {
        role = 'worker';
    }

    const userWithRole = { ...user, role };
    localStorage.setItem("usuario", JSON.stringify(userWithRole));
};

export const setActualId = (access:string) => {
    const userId = jwtDecode(access);
    localStorage.setItem("usuarioId", JSON.stringify(userId));
}
  
export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const clearTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

export const deleteUser = () => {
    localStorage.removeItem("usuario")
};


export const logout = () => {
    clearTokens();
    deleteUser();
};