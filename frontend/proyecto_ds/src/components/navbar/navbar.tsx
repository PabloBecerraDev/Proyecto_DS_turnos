import Logout from "@/api/Logout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
};

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await Logout();
    setUser(null); // Limpiar estado del usuario
    navigate("/");
  };

  // Verificar si el usuario está logueado
  const isLoggedIn = user !== null;
  const userRole = user?.role;

  return (
    <nav
      className={`z-50 transition-all duration-300 ${
        isMobile
          ? "fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white/10 shadow-xl backdrop-blur-md rounded-full w-[90%] max-w-md flex justify-around items-center"
          : `fixed top-0 w-full px-6 py-3 ${
              scrolled ? "bg-white/20 shadow-lg" : "bg-white/10"
            } backdrop-blur-lg`
      }`}
    >
      {isMobile ? (
        <>
          <a href="/" className="text-black hover:text-[#81D8D0] transition">Home</a>
          
          {/* Mostrar diferentes opciones según el rol */}
          {isLoggedIn && userRole === "actor" && (
            <a href="/perfil" className="text-black hover:text-[#81D8D0] transition">👤</a>
          )}
          
          {isLoggedIn && userRole === "worker" && (
            <a href="/dashboard" className="text-black hover:text-[#81D8D0] transition">📊</a>
          )}
          
          {!isLoggedIn && (
            <a href="/login" className="text-black hover:text-[#81D8D0] transition">🔐</a>
          )}
          
          <a href="/contacto" className="text-black hover:text-[#81D8D0] transition">op1</a>
          
          {/* Solo mostrar logout si está logueado */}
          {isLoggedIn && (
            <button
              className="text-black hover:text-red-300 transition"
              onClick={handleLogout}
            >
              🚪
            </button>
          )}
        </>
      ) : (
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-500">Q manager</div>
          <div className="space-x-8 text-black font-medium">
            <a href="/" className="hover:text-[#81D8D0] transition">Inicio</a>
            
            {/* Mostrar diferentes opciones según el rol */}
            {isLoggedIn && userRole === "actor" && (
              <a href="/profile" className="hover:text-[#81D8D0] transition">Perfil</a>
            )}
            
            {isLoggedIn && userRole === "worker" && (
              <>
                <a href="/dashboard" className="hover:text-[#81D8D0] transition">Dashboard</a>
                <a href="/manage" className="hover:text-[#81D8D0] transition">Gestionar</a>
              </>
            )}
            
            {!isLoggedIn && (
              <a href="/login" className="hover:text-[#81D8D0] transition">Iniciar Sesión</a>
            )}
            
            <a href="/contacto" className="hover:text-[#81D8D0] transition">Contacto</a>
            
            {/* Solo mostrar logout si está logueado */}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="hover:text-red-300 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;