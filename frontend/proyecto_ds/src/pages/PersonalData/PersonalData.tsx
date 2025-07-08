import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";


const PersonalData = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const MOTIVE_MAP: Record<string, string> = {
    A: "Adulto de tercera edad.",
    B: "Mujer embarazada.",
    C: "Persona en silla de ruedas o muletas.",
    D: "Otros.",
  };

  return (
    <>
    
    <Navbar />

    <div className="flex items-center justify-center mt-16 w-full min-h-[80vh] bg-gray-100 px-6 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-md p-8">
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex flex-col w-full sm:w-[45%] min-w-[200px]">
            <label className="text-gray-600 font-semibold mb-2">Nombre:</label>
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 shadow-sm text-gray-800">
              {user?.nombre ?? "Cargando..."}
            </div>
          </div>

          <div className="flex flex-col w-full sm:w-[45%] min-w-[200px]">
            <label className="text-gray-600 font-semibold mb-2">Cédula:</label>
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 shadow-sm text-gray-800">
              {user?.cedula ?? "Cargando..."}
            </div>
          </div>

          <div className="flex flex-col w-full sm:w-[45%] min-w-[200px]">
            <label className="text-gray-600 font-semibold mb-2">Email:</label>
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 shadow-sm text-gray-800">
              {user?.email ?? "Cargando..."}
            </div>
          </div>

          {user?.role === "worker" && (
            <div className="flex flex-col w-full sm:w-[45%] min-w-[200px]">
              <label className="text-gray-600 font-semibold mb-2">Código:</label>
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 shadow-sm text-gray-800">
                {user?.code ?? "Sin código"}
              </div>
            </div>
          )}


          {user?.role === "actor" && (
            <div className="flex flex-col w-full sm:w-[45%] min-w-[200px]">
              <label className="text-gray-600 font-semibold mb-2">¿Tienes prioridad?</label>
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 shadow-sm text-gray-800">
                {user?.has_priority ? "Sí" : "No"}
              </div>
            </div>
          )}

          {user?.role === "actor" && (
            <div className="flex flex-col w-full sm:w-[45%] min-w-[200px]">
              <label className="text-gray-600 font-semibold mb-2">Motivo:</label>
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 shadow-sm text-gray-800">
              {user?.motive ? MOTIVE_MAP[user.motive] || "Motivo desconocido" : "N/A"}
              </div>
            </div>
          )}

          

          <div className="flex flex-col w-full sm:w-[45%] min-w-[200px]">
            <label className="text-gray-600 font-semibold mb-2">Contraseña:</label>
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 shadow-sm text-gray-800">
              ••••••••
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-xl transition-all duration-300 shadow-md">
            Editar
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default PersonalData;

  