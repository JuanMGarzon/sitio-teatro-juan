import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Home } from "./components/pages/Home";
import { Cartelera } from "./components/pages/Cartelera";
import { Salas } from "./components/pages/Salas";
import { Registro } from "./components/pages/Registro";
import { Compra } from "./components/pages/Compra";
import { Contacto } from "./components/pages/Contacto";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedShowId, setSelectedShowId] = useState<number | null>(null);

  const handleNavigate = (page: string, showId?: number) => {
    setCurrentPage(page);
    if (showId) {
      setSelectedShowId(showId);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Envía un evento a Google Analytics cada vez que la página cambia
    if (window.gtag) {
      window.gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
        page_path: `/${currentPage}`,
        page_title: currentPage,
      });
    }
    
    console.log("Página visitada:", currentPage);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={handleNavigate} />;
      case "cartelera":
        return <Cartelera onNavigate={handleNavigate} />;
      case "salas":
        return <Salas />;
      case "registro":
        return <Registro />;
      case "compra":
        return <Compra selectedShowId={selectedShowId} onNavigate={handleNavigate} />;
      case "contacto":
        return <Contacto />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white mb-4">Teatro Lux</h3>
              <p className="text-sm text-gray-400">
                Desde 1950 llevando cultura y entretenimiento de calidad a todos los argentinos.
              </p>
            </div>
            
            <div>
              <h4 className="text-white mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => handleNavigate("home")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Inicio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate("cartelera")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cartelera
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate("salas")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Nuestras Salas
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate("contacto")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contacto
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Términos y Condiciones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Política de Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Política de Devoluciones
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>&copy; 2025 Teatro Lux. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}