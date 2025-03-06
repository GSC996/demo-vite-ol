import { useState } from "react";
import MapComponent from "./components/Map";
import "./App.css";

function App() {
  const [zoom, setZoom] = useState(4);
  const [showInfo, setShowInfo] = useState(false);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(19, prev + 1));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(2, prev - 1));
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Visor de Mapas con OpenLayers</h1>
          <button onClick={() => setShowInfo(!showInfo)} className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded">
            {showInfo ? "Ocultar Info" : "Mostrar Info"}
          </button>
        </div>
      </header>

      {showInfo && (
        <div className="bg-blue-100 p-4 border-b border-blue-200">
          <div className="container mx-auto">
            <h2 className="text-lg font-semibold mb-2">Acerca del Visor de Mapas</h2>
            <p>Este es un visor de mapas simple creado con React, Vite, Tailwind CSS y OpenLayers.</p>
            <p>Puedes cambiar entre diferentes capas base y ajustar el nivel de zoom.</p>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-gray-100 p-4 overflow-auto">
          <h2 className="text-lg font-semibold mb-4">Controles</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Zoom</h3>
              <div className="flex flex-col gap-2">
                <button onClick={handleZoomIn} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" disabled={zoom >= 19}>
                  Zoom In (+)
                </button>
                <button onClick={handleZoomOut} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" disabled={zoom <= 2}>
                  Zoom Out (-)
                </button>
                <div className="mt-2">
                  <p>Nivel de zoom: {zoom}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Instrucciones</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Usa los botones de la barra superior para cambiar el mapa base</li>
                <li>Arrastra para mover el mapa</li>
                <li>Usa la rueda del ratón para hacer zoom</li>
                <li>Haz doble clic para acercar</li>
              </ul>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-4 overflow-hidden">
          <div className="w-full h-full border border-gray-300 rounded shadow-md overflow-hidden">
            <MapComponent zoom={zoom} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
