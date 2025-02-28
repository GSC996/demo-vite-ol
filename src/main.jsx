import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MapView from "./MapView.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MapView />
  </StrictMode>
);
