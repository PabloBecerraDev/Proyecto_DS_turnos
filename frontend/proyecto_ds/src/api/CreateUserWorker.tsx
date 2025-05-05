import api from "./axios";
import {CreateUserWorkerPayload} from "@/api/types"



const CreateUserWorker = async (data: CreateUserWorkerPayload): Promise<CreateUserWorkerPayload | void> => {
  try{
    const response = await api.post<CreateUserWorkerPayload>("users/workers/", data,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    console.log('Usuario creado:', response.data);

  }catch (error:any){
    if (error.response){
        console.error('Error del backend:', error.response.data);
    } else {
        console.error('Error al conectar con el servidor:', error.message);
    }
    throw error;
  }
};


export default CreateUserWorker