// src/components/map/Map.jsx
import { useRef, useState } from "react";
import { useMap } from "../../hooks/useMap";
import { useBaseLayers } from "./layers/BaseLayers";
import BaseLayerSelector from "./ui/BaseLayerSelector";
import "ol/ol.css";

function MapComponent() {
  const mapRef = useRef(null);
  const { map, updateZoom } = useMap(mapRef);
  const { selectedBaseMap, setSelectedBaseMap, baseLayers } = useBaseLayers(map);
  const [showBaseLayerSelector, setShowBaseLayerSelector] = useState(false);

  return (
    <div className="h-full w-full relative">
      <div ref={mapRef} className="h-full w-full"></div>

      {/* Botones de zoom */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
        <button onClick={() => map && map.getView().animate({ zoom: map.getView().getZoom() + 1 })} className="bg-white p-2 rounded shadow hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
        <button onClick={() => map && map.getView().animate({ zoom: map.getView().getZoom() - 1 })} className="bg-white p-2 rounded shadow hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Selector de mapa base estilo Google Maps */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center">
          <button onClick={() => setShowBaseLayerSelector(!showBaseLayerSelector)} className="bg-white rounded-full p-2 shadow mb-2 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </button>

          {showBaseLayerSelector && (
            <BaseLayerSelector
              baseLayers={baseLayers}
              selectedBaseMap={selectedBaseMap}
              onSelect={(baseMap) => {
                setSelectedBaseMap(baseMap);
                setShowBaseLayerSelector(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MapComponent;