import api from "./axios";
import  {logout}  from "@/utils/tokenUtils";


const Logout = async () => {
  const access = localStorage.getItem("accessToken");
  const refresh = localStorage.getItem("refreshToken");
  console.log(access);
  console.log(refresh);

  if (!access || !refresh) {
    console.error("No hay tokens almacenados");
    return;
  }

  try {
    const response = await api.post("users/logout/", {
      access,
      refresh,
    },{
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log(response.data.message);

    logout()

  } catch (error:any) {
    console.error("Error al cerrar sesión:", error.response?.data || error.message);
  }
};


export default Logout;