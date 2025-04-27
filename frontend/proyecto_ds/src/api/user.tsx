import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/"

interface BaseUser {
    name: string;
    cedula: string;
    email: string;
    phone_number: string;
    password: string;
    is_staff: boolean;
    is_admin: boolean;
    has_priority?: boolean;
    //priority_type?: string;
    // trabajador?: string;
  }

export const fetchUsuario = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createUsuario = async (usuarioData: BaseUser) => {
    try {
      const response = await axios.post(`${API_URL}users/create_user/`, usuarioData);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if (status === 400) {
          console.error("Bad Request: ", error.response.data);
        } else if (status === 500) {
          console.error("Server Error: ", error.response.data);
        }
      }
      throw error;
    }
};