import { useNavigate } from 'react-router-dom';
import useMediaQuery from "@/hooks/useMediaQuery";
import './style.css';
import Navbar from '../../components/navbar/navbar';
import FooterComponent from '@/components/footer/footerPage';


const ProfilePageWorker = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const user = JSON.parse(localStorage.getItem("usuario") || "null");

  return (
    <>
    <Navbar />
    <div className="flex flex-col bg-gray-100 md:flex-row sm:py-10 min-h-screen items-center justify-center">

      <div
        className='flex flex-col h-[80%] pt-4 sm:pt-6'
      >


      <div className="max-w-sm  mx-15 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Buen dia, {user?.nombre}</h5>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Codigo: {user?.code}</h5>
          
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Este es el panel de trabajo para gestionar las filas. Desde aca podras realizar varias acciones. </p>
          <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Read more
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
          </a>
      </div>

      {isMobile && (
        <hr className="my-8 w-[80%] border-t border-gray-300 opacity-50" />
      )}

      

      <div 
        className="flex flex-col min-w-[35%] min-h-[90%] h-auto mx-15 shadow-lg rounded-2xl px-3.5 mt-8"
      >
        <h2 className='font-bold text-2xl text-black'> Iniciar turnos</h2>
        <button
          type="button"
          className="text-white w-fit bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 
                    hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 
                    dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-10 py-2 text-center me-2 mb-2 mt-2"
        >
          Iniciar
        </button>

        <hr className="my-4 border-t border-gray-300 opacity-50" />

        <h2 className='font-bold text-2xl text-black'> Unirme a una sesion</h2>

        <div className="bg-blue-100 backdrop-blur-md rounded-xl shadow-inner p-4 mt-3 mb-3 w-full">
          <button
          type="button"
          className="text-white w-fit bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 
                    hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 
                    dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-10 py-2 text-center me-2 mb-2 mt-2"
        >
          Iniciar
        </button><button
          type="button"
          className="text-white w-fit bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 
                    hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 
                    dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-10 py-2 text-center me-2 mb-2 mt-2"
        >
          Iniciar
        </button>
        </div>
      </div>
      </div>


      {isMobile && (
        <hr className="my-8 w-[80%] border-t border-gray-300 opacity-50" />
      )}


      <div className="w-full px-4 sm:px-6 md:w-1/2 mx-auto">
        <h1 className="font-bold text-2xl text-black pb-4">Otras acciones</h1>

        <div className="bg-neutral-200 backdrop-blur-md shadow-inner rounded-xl p-4 flex flex-col gap-3">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 
                      hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-sky-300 
                      dark:focus:ring-sky-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Establecer anuncios
          </button>

          <button
            type="button"
            className="text-white bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 
                      hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-sky-300 
                      dark:focus:ring-sky-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => navigate('/register')}
          >
            Registrar usuarios
          </button>

          <button
            type="button"
            className="text-white bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 
                      hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-sky-300 
                      dark:focus:ring-sky-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Ver mi información
          </button>

          <button
            type="button"
            className="text-white bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 
                      hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-sky-300 
                      dark:focus:ring-sky-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Modificar usuario
          </button>

        </div>
      </div>
      <br />
      <br />
      <br />
      
      {/* Cabecera con nombre y correo */}
      {/* <div className="header">
        <h1>Bienvenido, {user.nombre}</h1>
        <p className="email">{user.email}</p>
      </div> */}

      {/* Sección de menú de opciones */}
      {/*<div className="menu">
        <div className="card" onClick={() => navigate('/turns')}>
          <h3>Suspender o iniciar fila</h3>
          <p>Cambiar el estado de un punto de atencion.</p>
        </div>
        <div className="card" onClick={() => navigate('/register')}>
          <h3>Registrar usuario</h3>
          <p>Registra usuarios al sistema.</p>
        </div>
        <div className="card" onClick={() => navigate('/profile')}>
          <h3>Editar usuario</h3>
          <p>Editar los datos de un usuarios del sistema.</p>
        </div>
      </div>*/}





    </div>

    <FooterComponent />
    </>
  );
};

export default ProfilePageWorker;
