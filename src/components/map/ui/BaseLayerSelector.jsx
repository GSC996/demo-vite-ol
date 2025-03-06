// src/components/map/ui/BaseLayerSelector.jsx
import React from "react";

function BaseLayerSelector({ baseLayers, selectedBaseMap, onSelect }) {
  // Ordenar por peso
  const sortedLayers = [...baseLayers].sort((a, b) => a.peso - b.peso);

  return (
    <div className="bg-white p-2 mb-2 flex space-x-2 overflow-x-auto">
      {sortedLayers.map((baseLayer) => (
        <button key={baseLayer.nombre} className={`px-3 py-1 rounded whitespace-nowrap ${selectedBaseMap === baseLayer.nombre ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => onSelect(baseLayer.nombre)}>
          {baseLayer.titulo}
        </button>
      ))}
    </div>
  );
}

export default BaseLayerSelector;
