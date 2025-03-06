// src/hooks/useMap.js
import { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import { defaults as defaultControls } from 'ol/control';
import ZoomSlider from 'ol/control/ZoomSlider';
import ScaleLine from 'ol/control/ScaleLine';
import FullScreen from 'ol/control/FullScreen';
import { useConfig } from './useConfig';

export function useMap(mapTargetRef) {
  const { config } = useConfig();
  const mapInstanceRef = useRef(null);

  // Este efecto crea la instancia del mapa
  useEffect(() => {
    if (!mapTargetRef.current || !config || mapInstanceRef.current) return;

    const { mapConfig } = config;

    mapInstanceRef.current = new Map({
      target: mapTargetRef.current,
      layers: [], // Las capas se añaden en otro lugar
      view: new View({
        center: fromLonLat([mapConfig.center.longitude, mapConfig.center.latitude]),
        zoom: mapConfig.zoom.initial,
        maxZoom: mapConfig.zoom.max,
        minZoom: mapConfig.zoom.min,
      }),
      controls: defaultControls().extend([
        new ZoomSlider(),
        new ScaleLine(),
        new FullScreen(),
      ]),
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(null);
        mapInstanceRef.current = null;
      }
    };
  }, [mapTargetRef, config]);

  // Este efecto actualiza el zoom cuando cambia
  const updateZoom = (newZoom) => {
    if (!mapInstanceRef.current) return;

    const view = mapInstanceRef.current.getView();
    view.animate({
      zoom: newZoom,
      duration: 250,
    });
  };

  return {
    map: mapInstanceRef.current,
    updateZoom,
  };
}