import { useState } from "react";
import Home from "./pages/Home";
import MyAnime from "./pages/MyAnime";
import AnimeDetails from "./pages/AnimeDetails";
import Layout from "./components/Layout";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter basename="/anime-tracker-app">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/my-anime" element={<MyAnime name="jamiu" />} />
          <Route path="/anime-details/:id" element={<AnimeDetails />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
