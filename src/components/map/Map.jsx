// src/components/map/Map.jsx
import { useRef } from "react";
import { useMap } from "../../hooks/useMap";
import { useBaseLayers } from "./layers/BaseLayers";
import BaseLayerSelector from "./ui/BaseLayerSelector";
import "ol/ol.css";

function MapComponent({ onZoomChange }) {
  const mapRef = useRef(null);
  const { map, updateZoom } = useMap(mapRef);
  const { selectedBaseMap, setSelectedBaseMap, baseLayers } = useBaseLayers(map);

  return (
    <div className="h-full flex flex-col">
      <BaseLayerSelector baseLayers={baseLayers} selectedBaseMap={selectedBaseMap} onSelect={setSelectedBaseMap} />
      <div ref={mapRef} className="flex-1"></div>
    </div>
  );
}

export default MapComponent;
