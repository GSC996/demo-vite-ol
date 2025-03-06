// src/App.jsx
import { useState } from "react";
import MapComponent from "./components/map/Map";
import LayersMenu from "./components/map/menu/LayersMenu";
import Navbar from "./components/ui/Navbar";
import { useConfig } from "./hooks/useConfig";
import "./styles/App.css";

function App() {
  const { config, loading } = useConfig();
  const [showLayersMenu, setShowLayersMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("IG"); // Tab por defecto

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar logo={config.logo} title={config.title} onMenuClick={() => setShowLayersMenu(!showLayersMenu)} />

      <div className="flex flex-1 relative overflow-hidden">
        {/* Menú de capas */}
        {showLayersMenu && (
          <div className="absolute top-0 left-0 z-10000 h-full bg-white shadow-lg overflow-auto w-80">
            <LayersMenu layers={config.layers} activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        )}

        {/* Componente del mapa */}
        <div className="w-full h-full">
          <MapComponent />
        </div>
      </div>
    </div>
  );
}

export default App;