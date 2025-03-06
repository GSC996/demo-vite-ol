import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "ol/ol.css"; // Añade esta línea para importar los estilos de OpenLayers
import "./styles/index.css";

// Modificar el título del documento basado en la configuración
import configData from './config/map-config.json';
document.title = configData.title || 'Visor de Mapas';

// Añadir metatags dinámicos
if (configData.metaTags) {
  const { description, image } = configData.metaTags;
  
  if (description) {
    const metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    metaDesc.content = description;
    document.head.appendChild(metaDesc);
  }
  
  if (image) {
    const metaImage = document.createElement('meta');
    metaImage.property = 'og:image';
    metaImage.content = image;
    document.head.appendChild(metaImage);
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
