import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "ol/ol.css"; // Añade esta línea para importar los estilos de OpenLayers
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
