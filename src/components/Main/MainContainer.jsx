
import React from "react";
import "./Main.css";
import NavbarMain from "./NavbarMain";
import MainSection from "./MainSection";
import League from "../League/League.jsx";
import { Routes, Route } from "react-router-dom";
import Favorite from "../Favorite/Favorite";
import Team from "../Team/Team";

export default function Main() {

  return (
    <main>
      <NavbarMain />
     
      <Routes>
          <Route path="/" element={<MainSection />} />
          <Route path="/:leagueName" element={<League key="leaugeName"/>} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/:leagueName/:teamId" element={<Team key="teamName"/>} />
      </Routes>
      
    </main>
  );
}
