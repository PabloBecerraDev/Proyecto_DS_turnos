import { useState} from "react";
import imagenLogin from "@/assets/formsImage.png";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useNavigate} from "react-router-dom"

import { LoginPayLoad } from "@/auth/authService";
import { ToastContainer, toast } from 'react-toastify';

import LoginUser from "@/api/LoginUser";
import "./style.css"

// import { useAuth } from "../../context/AuthContext"



const LoginForm = () => {
  const [showPassword, setshowPassword] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [cedula, setCedula] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setshowPassword(!showPassword);
  }; 

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError("")

    if (!cedula || !password) {
      toast.error("Por favor ingrese las credenciales.");
      return
    }

    if (/[a-zA-Z]/.test(cedula)) {
      toast.error("Ingrese una cedula valida (solo se permiten numeros).");
      return
    }

    setLoading(true)

    const payload: LoginPayLoad = {
      cedula: cedula.toString(),
      password: password,
    };

    try {
      await LoginUser(payload);
        navigate("/home-user");
    } catch (err: any) {
      console.error("Detalle del error:", err);
      if (err.response?.status === 400) {
        toast.error("Las credenciales no coinciden.");
      } else if (err.response?.status === 500) {
        toast.error("Error interno del servidor.");
      } else {
        toast.error("No se pudo conectar con el servidor.");
      }
      setLoading(false);
    } 
  }

  return (
    <section 
      className="flex items-center justify-center h-screen"
    >
      <ToastContainer
        position={isMobile ? "top-center" : "top-right"}
        autoClose={3000}
        limit={isMobile ? 2 : 5}
        toastClassName={() =>
          `relative flex p-5 rounded-md justify-between overflow-hidden cursor-pointer 
          ${isMobile ? "w-[90%] text-sm" : "w-[400px] text-base"} text-black bg-white shadow-md`
        }
      />
      <div className={`bg-stone-100 flex rounded-2xl shadow-lg w-[65%] h-[84%] m-11 
        ${isMobile ? "flex-col" : "flex-row"}
      `}>

        {/* campos */}
        <div
          className={`flex flex-col h-full  rounded-2xl ${isMobile ? "w-[100%]" : "w-[50%]"}`}
        >
          <form onSubmit={handleSubmit} 
          className="flex flex-col w-full p-4"
          >
            <h2
              className="font-bold text-2xl text-left"
            >
              Login
            </h2>

            <p
            className="text-sm mt-3 text-neutral-500 text-left"
            >
              Inicia sesión para acceder a Q-manager.
            </p>

            {error && (
              <div className="bg-red-200 text-red-800 p-2 mt-4 rounded-md w-[95%]">
                {error}
              </div>
            )}

            <input 
              disabled = {loading}
              type="text" 
              name="cedula" 
              placeholder="Cedula" 
              className="p-2 mt-8 rounded-xl bg-gray-300 w-[95%]"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />

            <div className="relative w-[95%] mt-4">
                <input 
                  disabled = {loading}
                  className="p-2 rounded-xl bg-gray-300 w-full" 
                  type={showPassword ? "text" : "password"}  
                  name="password" 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="gray"
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  viewBox="0 0 20 22"
                  onClick={togglePasswordVisibility}
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
            </div>
            <div className="flex form-actions py-4">
              <button
                type = "submit" disabled={loading} className="p-2 mt-4 hover rounded-xl w-[95%] bg-blue-600 text-white hover:bg-blue-700 justify-center"
              >{loading ? "Iniciando sesión..." : "Iniciar Sesión"}</button>
            </div>
          </form>

            <div
              className={`flex flex-col h-auto space-y-3 ${isMobile ? "mt-0" : "mt-16"}`}
            >

              <hr className=" mx-3 border-gray-300 " />

              <div className="p-4 text-xs flex justify-between items-center text-gray-500">
                <p>¿Olvidaste tu contraseña?</p>
                <button className="py-2 px-2 bg-white border rounded-xl hover:scale-110 duration-300"><a href="/register">Recuperar contraseña</a></button>
              </div>
            </div>
          </div>

        {/* imagen */}

        {!isMobile && (
          <div className="flex justify-center w-[50%] h-full">
            <img src={imagenLogin} alt="Login" className="p-3 rounded-2xl" />
          </div>
        )}

      </div>

    </section>
  )
}

export default LoginForm