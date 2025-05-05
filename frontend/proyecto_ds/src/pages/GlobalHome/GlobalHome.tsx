import { useNavigate } from "react-router-dom";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useEffect, useState } from "react";


export default function HomePage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  
    useEffect(() => {
      const storedUser = localStorage.getItem("usuario");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-indigo-100 to-indigo-200">
      <div className={`flex flex-col ${isMobile ? "w-[90%]" : "w-[70%]"} bg-white rounded-3xl shadow-2xl overflow-hidden p-8`}>
        
        {/* Título y bienvenida */}
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold text-neutral-700 mb-6">
            Bienvenido al Sistema de Gestión de Turnos
          </h1>
          <p className="text-neutral-600 text-lg mb-6 max-w-2xl mx-auto">
            Como administrador, puedes gestionar los usuarios, crear turnos y mucho más. Organiza el proceso de manera eficiente, rápida y sin complicaciones. ¡Todo está bajo control!
          </p>

          {/* Botones de navegación */}
          <div className="flex flex-col gap-4 w-[40%] justify-center items-center">
            <button
              onClick={() => navigate("/about")}
              className="py-3 px-6 rounded-full w-fit bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all font-semibold text-2xl "
            >
              Mas sobre nosotros
            </button>

            {/* Botón de Iniciar sesión */}
            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="py-3 px-6 rounded-full bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all font-semibold mt-4 text-2xl"
              >
                Iniciar Sesión
              </button>
            ): (
              <button
                onClick={() => navigate("/home-user")}
                className="py-3 px-6 rounded-full bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all font-semibold mt-4 text-2xl"
              >
                ¡Solicita tu turno!
              </button>
            )}
            
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
            ¿Por qué elegir nuestro sistema?
          </h2>
          <p className="text-neutral-500 text-lg max-w-3xl mx-auto">
            Nuestro sistema está diseñado para ser intuitivo, eficiente y fácil de usar. Podrás gestionar turnos y usuarios sin complicaciones, garantizando una experiencia fluida y rápida. ¡Optimiza tu tiempo y recursos con nuestra herramienta de administración!
          </p>
        </div>

      </div>
    </section>
  );
}
