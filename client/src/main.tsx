import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { Welcome } from "./components/Welcome.tsx";
import { Home } from "./components/Home.tsx";
import { Register } from "./components/Register.tsx";
import { Login } from "./components/Login.tsx";
import { Book } from "./components/Book.tsx";
import { Ride } from "./components/Ride.tsx";
import { App } from "./App.tsx";
import { UserLayout } from "./components/UserLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route element={<UserLayout />}>
            <Route path="book" element={<Book />} />
            <Route path="rides/:rideId" element={<Ride />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
