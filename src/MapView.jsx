import React, { useEffect } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM";
import "ol/ol.css";

function MapView() {
  useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [-7000000, -5500000],
        zoom: 4,
      }),
    });

    return () => {
      map.setTarget(null);
    };
  }, []);

  return <div id="map" style={{ width: "100vw", height: "100vh" }} />;
}

export default MapView;
