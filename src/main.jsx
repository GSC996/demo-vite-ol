import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "ol/ol.css"; // Añade esta línea para importar los estilos de OpenLayers
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
