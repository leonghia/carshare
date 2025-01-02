import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { Welcome } from "./components/Welcome.tsx";
import { Home } from "./components/Home.tsx";
import { Register } from "./components/Register.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
