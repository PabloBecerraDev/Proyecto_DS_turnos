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
  const handleLogout = async () => {
    await Logout();
    navigate("/");
  };

  const isMobile = useMediaQuery("(max-width: 768px)");
  // const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          {/* <a href="/perfil" className="text-white hover:text-[#81D8D0] transition">👤</a> */}
          <a href="/contacto" className="text-black hover:text-[#81D8D0] transition">op1</a>
          <button
            className="text-white hover:text-red-300 transition"
            onClick={handleLogout}
          >
            🚪
          </button>
        </>
      ) : (
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-500">Q manager</div>
          <div className="space-x-8 text-black font-medium">
            <a href="/" className="hover:text-[#81D8D0] transition">Inicio</a>
            <a href="/profile" className="hover:text-[#81D8D0] transition">Perfil</a> 
            <a href="/contacto" className="hover:text-[#81D8D0] transition">Contacto</a>
            <button
              onClick={handleLogout}
              className="hover:text-red-300 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
