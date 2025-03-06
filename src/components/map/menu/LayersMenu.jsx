// src/components/map/menu/LayersMenu.jsx
import React, { useState } from "react";
import { useWMSLayers } from "../../../hooks/useWMSLayers";

function LayersMenu({ layers, activeTab, onTabChange }) {
  const [expandedLayers, setExpandedLayers] = useState({});
  const { toggleLayerVisibility, isLayerVisible, subLayers } = useWMSLayers();

  // Agrupar capas por tab
  const groupedLayers = layers.reduce((acc, layer) => {
    const tabId = layer.tab.id;
    if (!acc[tabId]) {
      acc[tabId] = {
        id: tabId,
        content: layer.tab.content,
        layers: [],
      };
    }
    acc[tabId].layers.push(layer);
    return acc;
  }, {});

  const handleLayerToggle = (layerName) => {
    setExpandedLayers((prev) => ({
      ...prev,
      [layerName]: !prev[layerName],
    }));
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Barra de búsqueda de capas */}
      <div className="p-2 border-b">
        <div className="flex">
          <input type="text" placeholder="Buscar capa" className="flex-1 border border-gray-300 rounded-l px-3 py-1 text-sm" />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-r">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="ml-2 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Pestañas */}
      <div className="flex border-b bg-gray-100">
        {Object.values(groupedLayers).map((group) => (
          <button key={group.id} className={`px-4 py-2 text-sm ${activeTab === group.id ? "bg-[#00a8e0] text-white" : "bg-gray-100 text-gray-700"}`} onClick={() => onTabChange(group.id)}>
            {group.content}
          </button>
        ))}
      </div>

      {/* Lista de capas */}
      <div className="flex-1 overflow-auto">
        {groupedLayers[activeTab]?.layers.map((layer) => (
          <div key={layer.nombre} className="border-b">
            {/* Cabecera de la capa */}
            <button className="w-full text-left p-3 bg-[#00a8e0] text-white hover:bg-[#0097c9] flex justify-between items-center" onClick={() => handleLayerToggle(layer.nombre)}>
              <div>
                <div className="font-medium">{layer.nombre}</div>
                <div className="text-xs">{layer.short_abstract}</div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedLayers[layer.nombre] ? "transform rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Subcapas (solo visibles cuando la capa está expandida) */}
            {expandedLayers[layer.nombre] && (
              <div className="bg-white p-2">
                {subLayers[layer.seccion]?.map((subLayer) => (
                  <div key={subLayer.name} className="flex items-center p-2 hover:bg-gray-100">
                    <input type="checkbox" id={subLayer.name} checked={isLayerVisible(subLayer.name)} onChange={() => toggleLayerVisibility(subLayer)} className="mr-2" />
                    <label htmlFor={subLayer.name} className="flex items-center text-sm cursor-pointer">
                      {subLayer.icon && <img src={subLayer.icon} alt="" className="w-4 h-4 mr-2" />}
                      {subLayer.title}
                    </label>
                    <button className="ml-auto text-gray-500 hover:text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LayersMenu;
