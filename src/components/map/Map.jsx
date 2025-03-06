import { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import { defaults as defaultControls } from "ol/control";
import ZoomSlider from "ol/control/ZoomSlider";
import ScaleLine from "ol/control/ScaleLine";
import FullScreen from "ol/control/FullScreen";

function MapComponent({ zoom = 3 }) {
  const mapRef = useRef();
  const mapInstanceRef = useRef(null);
  const [selectedBaseMap, setSelectedBaseMap] = useState("argenmap");

  // Efecto para inicializar el mapa
  useEffect(() => {
    // Definimos las capas base disponibles
    const baseMaps = {
      argenmap: new TileLayer({
        source: new XYZ({
          url: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png",
          maxZoom: 19,
        }),
        title: "Argenmap",
        visible: selectedBaseMap === "argenmap",
      }),
      osm: new TileLayer({
        source: new OSM(),
        title: "OpenStreetMap",
        visible: selectedBaseMap === "osm",
      }),
      satellite: new TileLayer({
        source: new XYZ({
          url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          maxZoom: 19,
        }),
        title: "Satellite",
        visible: selectedBaseMap === "satellite",
      }),
      topo: new TileLayer({
        source: new XYZ({
          url: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png",
          maxZoom: 17,
        }),
        title: "Topographic",
        visible: selectedBaseMap === "topo",
      }),
    };

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new Map({
        target: mapRef.current,
        layers: [baseMaps.argenmap, baseMaps.osm, baseMaps.satellite, baseMaps.topo],
        view: new View({
          center: fromLonLat([-60, -40]),
          zoom: zoom,
          maxZoom: 19,
          minZoom: 3,
        }),
        controls: defaultControls().extend([new ZoomSlider(), new ScaleLine(), new FullScreen()]),
      });
    } else {
      // Actualizar la visibilidad de las capas
      mapInstanceRef.current.getLayers().forEach((layer) => {
        const title = layer.get("title");
        if (title === "Argenmap") {
          layer.setVisible(selectedBaseMap === "argenmap");
        } else if (title === "OpenStreetMap") {
          layer.setVisible(selectedBaseMap === "osm");
        } else if (title === "Satellite") {
          layer.setVisible(selectedBaseMap === "satellite");
        } else if (title === "Topographic") {
          layer.setVisible(selectedBaseMap === "topo");
        }
      });
    }

    // Limpieza cuando el componente se desmonta
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(null);
        mapInstanceRef.current = null;
      }
    };
  }, [selectedBaseMap]);

  // Efecto para actualizar el zoom cuando cambia
  useEffect(() => {
    if (mapInstanceRef.current) {
      const view = mapInstanceRef.current.getView();
      view.animate({
        zoom: zoom,
        duration: 250,
      });
    }
  }, [zoom]);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white p-2 mb-2 flex space-x-2">
        <button className={`px-3 py-1 rounded ${selectedBaseMap === "argenmap" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setSelectedBaseMap("argenmap")}>
          Argenmap IGN
        </button>
        <button className={`px-3 py-1 rounded ${selectedBaseMap === "osm" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setSelectedBaseMap("osm")}>
          OpenStreetMap
        </button>
        <button className={`px-3 py-1 rounded ${selectedBaseMap === "satellite" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setSelectedBaseMap("satellite")}>
          Satellite
        </button>
        <button className={`px-3 py-1 rounded ${selectedBaseMap === "topo" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setSelectedBaseMap("topo")}>
          Topographic
        </button>
      </div>
      <div ref={mapRef} className="flex-1"></div>
    </div>
  );
}

export default MapComponent;
