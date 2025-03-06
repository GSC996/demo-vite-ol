// src/hooks/useWMSLayers.js
import { useState, useEffect } from 'react';
import { ImageWMS } from 'ol/source';
import { Image as ImageLayer } from 'ol/layer';
import { useMap } from './useMap';
import { useConfig } from './useConfig';

export function useWMSLayers() {
  const { map } = useMap();
  const { config } = useConfig();
  const [visibleLayers, setVisibleLayers] = useState([]);
  const [subLayers, setSubLayers] = useState({});

  // Efecto para cargar las capacidades de los servicios WMS
  useEffect(() => {
    if (!map || !config) return;

    const fetchWMSCapabilities = async () => {
      const result = {};

      for (const layer of config.layers) {
        try {
          const response = await fetch(`${layer.host}?SERVICE=WMS&VERSION=${layer.version}&REQUEST=GetCapabilities`);
          const text = await response.text();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(text, "text/xml");

          const layerElements = xmlDoc.getElementsByTagName("Layer");
          const layers = [];

          for (let i = 1; i < layerElements.length; i++) { // Empezamos desde 1 para omitir la capa raíz
            const name = layerElements[i].getElementsByTagName("Name")[0]?.textContent;
            const title = layerElements[i].getElementsByTagName("Title")[0]?.textContent;

            if (name) {
              // Verificar si tenemos un icono definido para esta capa
              const iconPath = layer.icons?.[name];

              layers.push({
                name,
                title: title || name,
                icon: iconPath,
                host: layer.host,
                version: layer.version
              });
            }
          }

          result[layer.seccion] = layers;
        } catch (error) {
          console.error(`Error fetching capabilities for ${layer.host}:`, error);
        }
      }

      setSubLayers(result);
      console.log('Sublayers:', result);
    };

    fetchWMSCapabilities();
  }, [map, config]);

  // Función para alternar la visibilidad de una capa
  const toggleLayerVisibility = (subLayer) => {
    const layerName = subLayer.name;

    if (isLayerVisible(layerName)) {
      // Remover la capa si ya está visible
      setVisibleLayers(prev => prev.filter(layer => layer !== layerName));

      const layersToRemove = map.getLayers().getArray().filter(
        layer => layer.get('wmsName') === layerName
      );

      layersToRemove.forEach(layer => map.removeLayer(layer));
    } else {
      // Añadir la capa si no está visible
      setVisibleLayers(prev => [...prev, layerName]);

      const wmsSource = new ImageWMS({
        url: subLayer.host,
        params: {
          'LAYERS': layerName,
          'FORMAT': 'image/png',
          'TRANSPARENT': true
        },
        ratio: 1,
        serverType: 'geoserver'
      });

      const wmsLayer = new ImageLayer({
        source: wmsSource,
        properties: {
          wmsName: layerName
        }
      });

      map.addLayer(wmsLayer);
    }
  };

  // Función para verificar si una capa está visible
  const isLayerVisible = (layerName) => {
    return visibleLayers.includes(layerName);
  };

  return {
    toggleLayerVisibility,
    isLayerVisible,
    subLayers
  };
}