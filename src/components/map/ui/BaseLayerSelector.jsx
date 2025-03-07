// src/components/map/ui/BaseLayerSelector.jsx
import React from "react";

function BaseLayerSelector({ baseLayers, selectedBaseMap, onSelect }) {
  // Ordenar por peso
  const sortedLayers = [...baseLayers].sort((a, b) => a.peso - b.peso);

  return (
    <div className="bg-white rounded shadow-lg p-2 flex gap-2 overflow-x-auto max-w-lg">
      {sortedLayers.map((baseLayer) => (
        <button key={baseLayer.nombre} className={`flex flex-col items-center p-2 rounded hover:bg-gray-100 min-w-[85px] transition-all ${selectedBaseMap === baseLayer.nombre ? "ring-2 ring-blue-500" : ""}`} onClick={() => onSelect(baseLayer.nombre)}>
          <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden mb-1 shadow-sm">
            <img
              src={baseLayer.legendImg || ``}
              alt={baseLayer.titulo}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "";
              }}
            />
          </div>
          <span className="text-xs text-center font-medium">{baseLayer.titulo}</span>
        </button>
      ))}
    </div>
  );
}

export default BaseLayerSelector;
