import { useState } from 'react';
import imgRegister from '@/assets/imagenCreateUser.png';
import { ToastContainer, toast } from 'react-toastify';
import useMediaQuery from '@/hooks/useMediaQuery';
import {CreateUserWorkerPayload} from '@/api/types';
import CreateUserWorker from '@/api/CreateUserWorker';


function generarContraseña(longitud: number): string {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let contraseña = "";
  
    for (let i = 0; i < longitud; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      contraseña += caracteres[indice];
    }
  
    return contraseña;
}

const CreateWorkerForm = () => {

    const [nombre, setNombre] = useState("");
    const [cedula, setCedula] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");

    const isMobile = useMediaQuery("(max-width: 768px)");
    const [showPassword, setshowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setshowPassword(!showPassword);
    };

    const manejadorContrasena = () => {
        const contraGenerada = generarContraseña(12);
        setContraseña(contraGenerada);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() //se usa para evitar qu ela pagina se recargue 
        if (!nombre || !cedula || !telefono || !email || !contraseña) {
            toast.error("Por favor complete todos los campos.");
            return;
        }

        if (nombre.trim().length < 3) {
            toast.error("El nombre debe tener al menos 3 caracteres");
            return;
        }
        
        if (cedula.length > 10) {
            toast.error("La cédula debe tener maximo 10 dígitos numéricos");
            return;
        }
        
        if (contraseña.length < 6) {
            toast.error("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        const payload: CreateUserWorkerPayload = {
            nombre: nombre,
            cedula: Number(cedula),
            email: email,
            phone_number: Number(telefono),
            password: contraseña
        }

        try{
            const response = await CreateUserWorker(payload);
            console.log("Usuario creado exitosamente:", response);
            toast.success("Usuario creado con exito.");
        }catch (error){
            console.error("Error al crear el usuario:", error);
            toast.error("Ocurrio un error al crear el usuario.");
        }


    
    }

    return (
        <section
            className='flex min-h-screen h-[100%] items-center justify-center relative overflow-hidden'
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

        
        <div
            className={`flex bg-stone-100 rounded-2xl shadow-lg ${isMobile ? "w-[90%]" : "w-[85%]"} p-5 mt-11 mb-11`}        
        >
            {/* imagen */}

            {!isMobile && (
            <div
            className=" flex w-[45%] h-[100%] justify-center items-center "
            >
                <img src={imgRegister} alt="" className="w-[420px] h-[638px] rounded-2xl "/>
            </div>
            )}
            

            {/* campos */}

            <div
            className={`flex  min-w-[255px] ${isMobile? "w-[100%]" : "w-[55%]"} justify-center mt-8 `}
            >

            <form 
            action=""
            className='flex flex-col w-[80%]'
            onSubmit={handleSubmit}
            >
                <h2 className="font-bold text-2xl ">Register worker</h2>
                <p
                className="text-sm mt-4  text-neutral-500 "
                >Registrate para poder acceder a nuestras filas virtules. </p>

                <input 
                type="text" 
                name="name" 
                placeholder="Nombre" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="p-2 mt-8 rounded-xl bg-gray-300 "
                />

                <input 
                type="number" 
                name="cedula" 
                placeholder="Cedula" 
                className="p-2 mt-8 rounded-xl bg-gray-300 "
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                min={1}
                />

                <input 
                type="text" 
                name="telefono" 
                placeholder="Telefono" 
                className="p-2 mt-8 rounded-xl bg-gray-300 "
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                />

                <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                className="p-2 mt-8 rounded-xl bg-gray-300 "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                

                <p 
                className="text-sm mt-6  text-neutral-500 text-left"
                >
                Tu contraseña sera generada por nuestro gestor de contraseñas. 
                </p>


                <div className="relative mt-1">
                    <input 
                    className="p-2 mt-8 rounded-xl bg-gray-300 w-full" 
                    type={showPassword ? "text" : "password"}  
                    name="password" 
                    value={contraseña}

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

                <button
                type="button"
                className="py-2 px-4 mt-6 bg-stone-400 text-white rounded-xl hover:scale-105 duration-300 "
                onClick={manejadorContrasena}
                >
                Generar Contraseña
                </button>

                <button
                type="submit"
                className="py-2 px-4 mt-6 bg-stone-400 text-white rounded-xl hover:scale-105 duration-300 "
                >
                Registrarse
                </button>


            </form>

            </div>

        </div>

        </section>
  )
}

export default CreateWorkerForm