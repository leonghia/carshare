import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { Welcome } from "./components/Welcome.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
