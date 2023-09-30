
import React from "react";
import "./Main.css";
import NavbarMain from "./NavbarMain";
import MainSection from "./MainSection";
import League from "../League/League.jsx";
import { Routes, Route } from "react-router-dom";

export default function Main() {
  return (
    <main>
      <NavbarMain />
      <Routes>
        <Route path="/home" element={<MainSection />} />
        <Route path="/league" element={<League/>} />
      </Routes>
    </main>
  );
}
