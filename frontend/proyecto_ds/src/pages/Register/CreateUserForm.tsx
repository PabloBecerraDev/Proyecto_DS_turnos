import imgRegister from '@/assets/logo.png';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useState } from 'react';
import { createUsuario } from "../../api/user";
import { useNavigate } from 'react-router-dom';

//funcion para generar contraseñas de los usuarios 
function generarContraseña(longitud: number): string {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let contraseña = "";

  for (let i = 0; i < longitud; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    contraseña += caracteres[indice];
  }

  return contraseña;
}

// funcion que genera un codigo con datos ya inicializados
function generarCodigo(nombre: string, cedula: string): string {
  const letras = nombre.slice(0, 2).toUpperCase();
  const numeros = cedula.slice(0, 4);
  return numeros + letras;
}

// Tipos de usuario
type UserType = "actor" | "worker";

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

export default function CreateUserForm() {
  const [userType, setUserType] = useState<UserType>("actor")
  const [name, setName] = useState("")
  const [cedula, setCedula] = useState("")
  const [email, setEmail] = useState("")
  const [phone_number, setNumber] = useState("")
  const [has_priority, setIsPriority] = useState(false)
  const [password, setContraseña] = useState("");
  const [is_staff] = useState(false)
  const [is_admin] = useState(false)
  const [priorityType, setPriorityType] = useState("")
  const [code] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const manejadorContrasena = () => {
    const contraGenerada = generarContraseña(12);
    setContraseña(contraGenerada);
  };

  const handlePriorityChange = () => setIsPriority(prev => !prev);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return; // Si ya está enviando, no hacemos nada

    if (!name || !cedula || !email || !phone_number || !password) {
      alert("Por favor llena todos los campos obligatorios");
      return;
    }

    // Validar que phone_number y password sean numéricos
    const phoneIsNumeric = /^\d+$/.test(phone_number);
    const cedulaIsNumeric = /^\d+$/.test(cedula);

    if (!cedulaIsNumeric) {
      alert("La cedula debe contener solo números");
      return;
    }

    if (!phoneIsNumeric) {
      alert("El número de teléfono debe contener solo números");
      return;
    }

    setIsLoading(true); // Activamos loading

    // Base user
    const baseUser: BaseUser = {
      name,
      cedula,
      email,
      phone_number,
      password,
      is_staff,
      is_admin: false,
    };

    // Agregar extras según tipo
    if (userType === "actor" && has_priority) {
      baseUser.has_priority = true;
      // baseUser.priority_type = priorityType;
    }

    if (userType === "worker") {
      baseUser.is_staff = true;
      // baseUser.trabajador = trabajadorCode;
    }

    console.log("Datos a enviar:", baseUser);

    const navigate = useNavigate(); // Usamos useNavigate

    try {
      await createUsuario(baseUser); // Aquí tu llamada API
      alert("Usuario registrado exitosamente");
      navigate('/');
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Hubo un error al registrar el usuario");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
    className='flex min-h-screen items-center justify-center'
    >
      <div
        className={`flex bg-stone-100 rounded-2xl shadow-lg ${isMobile ? "w-[90% ]" : "w-3/4"} p-5 mt-11 mb-11`}
      >
        {/* imagen */}

        {!isMobile && (
          <div
          className="sm:block hidden w-[45%] h-full"
          >
            <img src={imgRegister} alt="" className="w-3/4 h-full rounded-2xl"/>
          </div>
        )}

        {/* campos */}

        <div
          className={`flex  min-w-[255px] ${isMobile? "w-[100%]" : "w-[55%]"} justify-center items-center`}
        >

          <form
            onSubmit={handleSubmit}
            action=""
            // className="flex flex-col items-center justify-center min-h-screen"
            className='flex flex-col w-full'
          >
            <h1 className="text-3xl font-bold text-center text-neutral-700 mb-8">
              Register
            </h1>
            <p
              className="text-sm mt-4  text-neutral-500 "
            > No se que poner aqui xd </p>

            {/* Tipo de usuario */}
            <select
              className="p-2 mt-4 rounded-xl bg-gray-300"
              value={userType}
              onChange={(e) => setUserType(e.target.value as UserType)}
            >
              <option value="actor">Usuario</option>
              <option value="worker">Trabajador</option>
            </select>

            {/* Campos generales */}
            <input
              type="text"
              name="name"
              value = {name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              className="p-2 mt-4 rounded-xl bg-gray-300"
            />
            <input
              type="text"
              name="cedula"
              value = {cedula}
              onChange={(e) => setCedula(e.target.value)}
              placeholder="Cédula"
              className="p-2 mt-4 rounded-xl bg-gray-300"
            />
            <input
              type="email"
              name="email"
              value = {email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="p-2 mt-4 rounded-xl bg-gray-300"
            />
            <input
              type="tel"
              name="phone_number"
              value = {phone_number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Número de teléfono"
              className="p-2 mt-4 rounded-xl bg-gray-300"
            />

            {/* Si es Actor */}
            {userType === "actor" && (
              <>
                <label className="flex items-center mt-4 text-sm text-neutral-500">
                  <input
                    type="checkbox"
                    checked={has_priority}
                    onChange={handlePriorityChange}
                    className="mr-2"
                  />
                  ¿El usuario requiere maxima prioridad?
                </label>

                {has_priority && (
                  <select
                    className="p-2 mt-4 rounded-xl bg-gray-300"
                    value={priorityType}
                    onChange={(e) => setPriorityType(e.target.value)}
                  >
                    <option value="" disabled>Seleccione prioridad</option>
                    <option value="embarazo">Mujer embarazada</option>
                    <option value="muletas">Persona en muletas</option>
                    <option value="tercera-edad">Tercera edad</option>
                  </select>
                )}
              </>
            )}

            {/* Contraseña */}
            <p 
              className="text-sm mt-6  text-neutral-500 text-left"
            >
              Selecciona una contraseña segura. 
            </p>

            <div className="relative mt-4">
              <input
                className="p-2 rounded-xl bg-gray-300 w-full"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="Contraseña"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="gray"
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer mt-4"
                viewBox="0 0 16 16"
                onClick={togglePasswordVisibility}
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </div>

            {/* Generar Contraseña */}
            <button
              type="button"
              onClick={manejadorContrasena}
              // className="p-2 mt-4 text-white rounded-xl bg-indigo-500 hover:bg-indigo-600"
              className="py-2 px-4 mt-6 bg-stone-400 text-white rounded-xl hover:scale-105 duration-300 "
            >
              Generar Contraseña
            </button>
{/* 
            Checkbox para is_staff
            <label className="flex items-center mt-4 text-sm text-neutral-500">
              <input
                type="checkbox"
                checked={isStaff}
                onChange={handleStaffChange}
                className="mr-2"
              />
              ¿Es staff?
            </label> */}

            {/* Botón de crear */}
            <button
              type="submit"
              disabled={isLoading}
              // className="p-2 mt-8 text-white rounded-xl bg-indigo-500 hover:bg-indigo-600"
              className="py-2 px-4 mt-6 bg-stone-400 text-white rounded-xl hover:scale-105 duration-300 "
            >
              {isLoading ? "Registrando..." : "Registrar"}
            </button>
          </form>
        </div>
      </div>

    </section>
  )
}