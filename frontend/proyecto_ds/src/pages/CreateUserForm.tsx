import imgRegister from '@/assets/imagenCreateUser.png';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useState } from 'react';

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


const CreateUserForm = () => {
    const [showPassword, setshowPassword] = useState(false);
    const [isPriority, setIsPriority] = useState(false);
    const [contraseña, setContraseña] = useState("");
    const isMobile = useMediaQuery("(max-width: 768px)");
    
    const togglePasswordVisibility = () => {
        setshowPassword(!showPassword);
    };

    const handlePriorityChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setIsPriority(e.target.checked);
    };

    const manejadorContrasena = () => {
      const contraGenerada = generarContraseña(12);
      setContraseña(contraGenerada);
    }

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
          action=""
          className='flex flex-col w-full'
          >
            <h2 className="font-bold text-2xl ">Register</h2>
            <p
              className="text-sm mt-4  text-neutral-500 "
            >Registrate para poder acceder a nuestras filas virtules. </p>

            <input 
              type="text" 
              name="name" 
              placeholder="Nombre" 
              className="p-2 mt-8 rounded-xl bg-gray-300 "
            />

            <input 
              type="number" 
              name="cedula" 
              placeholder="Cedula" 
              className="p-2 mt-8 rounded-xl bg-gray-300 "
              min={1}
            />

            <label className="flex items-center mt-8 text-sm text-neutral-500">
              <input 
                type="checkbox" 
                checked={isPriority}
                onChange={handlePriorityChange}
                className="mr-2"
              />
              ¿El usuario actualmente se encuentra en una situación de prioridad?
            </label>

            {/* Lista condicional */}
            {isPriority && (
              <select className="p-2 mt-4 rounded-xl bg-gray-300 ">
                <option value="">Seleccione una opción</option>
                <option value="embarazo">Mujer embarazada</option>
                <option value="muletas">Persona en muletas</option>
                <option value="tercera-edad">Tercera edad</option>
              </select>
            )}

            <p 
              className="text-sm mt-6  text-neutral-500 text-left"
            >
              Selecciona una contraseña segura. 
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

            {/* <div className="relative  ">
              <input 
                className="p-2 mt-8 rounded-xl bg-gray-300 w-full" 
                type={showPassword ? "text" : "password"}  
                name="Password" 
                placeholder="Password verification"
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
            </div> */}

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

export default CreateUserForm