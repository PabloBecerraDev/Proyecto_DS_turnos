import api from './axios';
import {EmailTypePayload} from './types'




const SendEmail = async(data: EmailTypePayload): Promise<EmailTypePayload | void> => {
    try{
        const response = await api.post<EmailTypePayload>("users/send_email/", data, {
            headers: {
                'Content-Type': 'application/json', 
            },
        });
        return response.data
    }catch (error: any) {
    if (error.response) {
      console.error('Error del backend:', error.response.data);
    } else {
      console.error('Error al conectar con el servidor:', error.message);
    }
    throw error;
  }
} 


export default SendEmail;