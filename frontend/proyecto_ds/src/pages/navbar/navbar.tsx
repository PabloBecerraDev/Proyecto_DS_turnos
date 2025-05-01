import Logout from "@/api/Logout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Hook personalizado para media queries
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
        
  const handleLogout = async () => {
        await Logout(); // Aquí haces la llamada al backend
        navigate("/"); // Rediriges al login
  };
        
    

  const isMobile = useMediaQuery("(max-width: 768px)");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  // Escuchar scroll para cambiar transparencia
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#81D8D0]/95 shadow-md" : "bg-[#81D8D0]/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-900">Q manager</div>

        {isMobile ? (
          <div>
            <button
              className="text-gray-800 focus:outline-none text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
            {menuOpen && (
              <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-md p-3 absolute right-4 top-14">
                <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-[#81D8D0]/30 rounded">Inicio</a>
                <a href="/perfil" className="block px-4 py-2 text-gray-700 hover:bg-[#81D8D0]/30 rounded">Perfil</a>
                <a href="/contacto" className="block px-4 py-2 text-gray-700 hover:bg-[#81D8D0]/30 rounded">Contacto</a>
                <a className="block px-4 py-2 text-gray-700 hover:bg-[#81D8D0]/30 rounded" onClick={handleLogout}>Logout</a>
              </div>
            )}
          </div>
        ) : (
          <div className="space-x-8 text-gray-800">
            <a href="/" className="hover:text-black transition">Inicio</a>
            <a href="/perfil" className="hover:text-black transition">Perfil</a>
            <a href="/contacto" className="hover:text-black transition">Contacto</a>
            <a className="hover:text-black transition" onClick={handleLogout}>Logout</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
