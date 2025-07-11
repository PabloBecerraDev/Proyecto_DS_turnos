import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Navbar from '../../components/navbar/navbar';
import FooterComponent from '@/components/footer/footerPage';




// Simulamos la obtención de datos del usuario
// const fetchUserProfile = async () => {
//   return {
//     name: 'Juan Pérez',
//     email: 'juan.perez@example.com',
//   };
// };

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
    <Navbar />
    <div className="bg-gray-50 py-24 sm:py-32">
  <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
    <h2 className="text-center text-base/7 font-semibold text-indigo-600">Q Manager</h2>
    <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">Panel de acceso y control del usuario</p>
    <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
      <div className="relative lg:row-span-2">
        <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-4xl"></div>

        {/*mosaico 1*/}
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
          <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Seccion de control de turnos</p>
          </div>
          <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
            <div className="mx-auto px-6 py-8 flex flex-col gap-6 max-w-xl">
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Turno Actual</h2>
                <p className="text-5xl font-extrabold text-blue-600">A023</p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 text-center">
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">Tu Turno</h3>
                <p className="text-4xl font-bold text-gray-500">A024</p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 text-center">
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">Puesto de Atención</h3>
                <p className="text-4xl font-bold text-gray-900">Puesto 5</p>
              </div>
            </div>
          </div>
        </div> 
        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-l-4xl"></div>  
      </div>


      {/* mosaico 2 - Anuncio Superior */}
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="p-4 h-full flex items-center justify-center min-h-[240px]">
                <iframe
                  src="https://adds-0nfk.onrender.com/api/anuncio/?tema=viajes&ancho=300&alto=200"
                  width="100%"
                  height="200"
                  style={{ border: 'none', maxWidth: '300px' }}
                  title="Anuncio Superior"
                  className="rounded-lg shadow-sm"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl"></div>
          </div>

          {/* mosaico 3 - Anuncio Inferior */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="p-4 h-full flex items-center justify-center min-h-[220px]">
                <iframe
                  src="https://adds-0nfk.onrender.com/api/anuncio/?tema=viajes&ancho=300&alto=180"
                  width="100%"
                  height="180"
                  style={{ border: 'none', maxWidth: '300px' }}
                  title="Anuncio Inferior"
                  className="rounded-lg shadow-sm"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5"></div>
          </div>






      {/* mosaico 4 */}
      <div className="relative lg:row-span-2">
        <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-r-4xl"></div>
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
          <div className="flex flex-col gap-4 p-6">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium shadow-sm transition">
              Más información sobre Q Manager
            </button>

            <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium shadow-sm transition">
              Contacto
            </button>

            <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium shadow-sm transition">
              Historial de turnos
            </button>

            <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium shadow-sm transition">
              Configuración de usuario
            </button>

            <br/>
            <div className="border-t border-gray-200 "></div>
            <br/>

            <div className="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-800 shadow-sm border border-gray-200">
              <label className="block text-sm font-medium mb-2">Reportar un problema</label>
              <textarea
                rows={3}
                placeholder="Describe el problema..."
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
              ></textarea>
              <button
                className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl"></div>
      </div>


    </div>
  </div>
</div>

<FooterComponent />

    
    </>
  );
};

export default ProfilePage;
