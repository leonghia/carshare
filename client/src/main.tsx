import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { Welcome } from "./components/Welcome.tsx";
import { Home } from "./components/Home.tsx";
import { Register } from "./components/Register.tsx";
import { Login } from "./components/Login.tsx";
import { Book } from "./components/Book.tsx";
import { RideStatus } from "./components/RideStatus.tsx";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="book" element={<Book />} />
          <Route path="ride-status" element={<RideStatus />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
