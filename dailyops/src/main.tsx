import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./styles/themes.css";
import App from "./App.tsx";
import { SettingsProvider } from "./context/SettingsContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </StrictMode>
);
