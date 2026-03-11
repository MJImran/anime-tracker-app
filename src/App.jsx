import { useState } from "react";
import Home from "./pages/Home";
import MyAnime from "./pages/MyAnime";
import AnimeDetails from "./pages/AnimeDetails";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/my-anime" element={<MyAnime name="jamiu" />} />
          <Route path="/anime-details/:id" element={<AnimeDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
