import api from "./axios";
import { ActorPayload } from "@/api/types";

const CreateUserActor = async (data: ActorPayload): Promise<ActorPayload | void> => {
  try {
    const response = await api.post<ActorPayload>("users/actors/", data, {
      headers: {
        'Content-Type': 'application/json', 
      },
    });
    console.log('Actor creado:', response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Error del backend:', error.response.data);
    } else {
      console.error('Error al conectar con el servidor:', error.message);
    }
    throw error;
  }
};

export default CreateUserActor;