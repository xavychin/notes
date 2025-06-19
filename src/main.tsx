import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/main.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/theme-context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
