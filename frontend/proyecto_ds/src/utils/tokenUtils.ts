import {jwtDecode} from "jwt-decode";

export const setTokens = (access: string, refresh: string) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
};

export const setActualUser = (access:string) => {
    const userDecode = jwtDecode(access);
    localStorage.setItem("usuario", JSON.stringify(userDecode));
};
  
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