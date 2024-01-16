import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import Account from "./Components/Account/Account";
import AnimePage from "./Components/AnimePage/AnimePage";
import AnimePlayer from "./Components/AnimePlayer/AnimePalyer"
import "./Media.css"
import "./reset.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime/:id" element={<AnimePage />} />
        <Route path="/anime/player/:id" element={<AnimePlayer />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
