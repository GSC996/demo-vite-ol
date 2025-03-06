// src/components/map/layers/BaseLayers.jsx
import { useEffect, useState } from "react";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import { useConfig } from "../../../hooks/useConfig";

export function useBaseLayers(map) {
  const { config } = useConfig();
  const [selectedBaseMap, setSelectedBaseMap] = useState("");
  const [baseLayers, setBaseLayers] = useState({});

  // Inicializar capas base desde la configuración
  useEffect(() => {
    if (!map || !config) return;

    const layers = {};

    // Encontrar el mapa base con menor peso o el primero si no tienen peso
    let defaultBaseMap = null;
    let lowestWeight = Infinity;

    config.basemap.forEach((baseMapConfig) => {
      // Si es el primer elemento y no hay peso definido aún
      if (defaultBaseMap === null) {
        defaultBaseMap = baseMapConfig.nombre;
      }

      // Si tiene peso y es menor que el actual más bajo
      if (baseMapConfig.peso !== undefined && baseMapConfig.peso < lowestWeight) {
        lowestWeight = baseMapConfig.peso;
        defaultBaseMap = baseMapConfig.nombre;
      }
    });

    // Crear las capas a partir de la configuración
    config.basemap.forEach((baseMapConfig) => {
      let source;

      if (baseMapConfig.servicio === "osm") {
        source = new OSM({
          attributions: baseMapConfig.attribution,
        });
      } else {
        // TMS o XYZ
        source = new XYZ({
          url: baseMapConfig.host,
          maxZoom: baseMapConfig.zoom.max,
          attributions: baseMapConfig.attribution,
        });
      }

      const layer = new TileLayer({
        source,
        title: baseMapConfig.titulo,
        // Visible solo si es el mapa base por defecto
        visible: baseMapConfig.nombre === defaultBaseMap,
        properties: {
          name: baseMapConfig.nombre,
        },
      });

      // Guardar las capas por nombre para acceso fácil
      layers[baseMapConfig.nombre] = layer;

      // Añadir la capa al mapa
      map.addLayer(layer);
    });

    // Establecer el mapa base seleccionado por defecto
    setSelectedBaseMap(defaultBaseMap);
    setBaseLayers(layers);

    // Cleanup function
    return () => {
      Object.values(layers).forEach((layer) => {
        map.removeLayer(layer);
      });
    };
  }, [map, config]);

  // Cambiar la visibilidad de las capas base cuando se selecciona una
  useEffect(() => {
    if (!map || !selectedBaseMap || Object.keys(baseLayers).length === 0) return;

    Object.entries(baseLayers).forEach(([name, layer]) => {
      layer.setVisible(name === selectedBaseMap);
    });
  }, [selectedBaseMap, baseLayers, map]);

  return {
    selectedBaseMap,
    setSelectedBaseMap,
    baseLayers: config?.basemap || [],
  };
}