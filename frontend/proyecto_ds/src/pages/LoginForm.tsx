import { useState, useEffect } from "react";
import imagenLogin from "@/assets/image.png";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useNavigate, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


const LoginForm = () => {
  const [cedula, setCedula] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setshowPassword] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const togglePasswordVisibility = () => {
    setshowPassword(!showPassword);
  };

  // If already logged in, redirect to dashboard
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/")
  //   }
  // }, [isAuthenticated, navigate])  

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError("")
    if (!cedula || !password) {
      setError("Por favor ingrese usuario y contraseña")
      return
    }

    setLoading(true)

    try {
      const success = await login(cedula, password)
      if (success) {
        navigate("/profile")
      } else {
        setError("Credenciales inválidas")
      }
    } catch (err) {
      setError("Error al iniciar sesión. Intente nuevamente.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }


  return (
    <section 
      className="flex items-center justify-center h-screen"
    >
      <div className={`bg-stone-100 flex rounded-2xl shadow-lg w-[65%] h-[78%] m-11 
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
              logeate para acceder a la fila virtual.
            </p>

            <input 
              type="text" 
              name="cedula" 
              placeholder="Cedula" 
              className="p-2 mt-8 rounded-xl bg-gray-300 w-[95%]"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />

            <div className="relative w-[95%] mt-4">
                <input 
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
            <div className="form-actions">
            <button
              type = "submit" disabled={loading} className="p-2 mt-4 rounded-xl w-[95%] bg-slate-400 text-white hover:bg-amber-100"
            >{loading ? "Iniciando sesión..." : "Iniciar Sesión"}</button>
            </div>
          </form>
    

            <div
              className="flex flex-col h-[20%] space-y-3 mt-5"
            >
              {/* <div className=" p-4 text-xs flex justify-between items-center text-gray-500">
                <p>Don't have an account?</p>
                <button className="py-2 px-2 bg-white border rounded-xl hover:scale-110 duration-300"><a href="/register">Registrate</a></button>
              </div> */}

              <hr className=" mx-3 border-gray-300 " />

              <div className=" p-4 text-xs flex justify-between items-center text-gray-500">
                <p>¿Olvidaste tu contraseña?</p>
                <button className="py-2 px-2 bg-white border rounded-xl hover:scale-110 duration-300"><a href="/register">Registrate</a></button>
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