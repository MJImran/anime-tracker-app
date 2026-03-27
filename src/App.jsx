import { useState } from "react";
import Home from "./pages/Home";
import MyAnime from "./pages/MyAnime";
import Login from "./pages/Login";
import AnimeDetails from "./pages/AnimeDetails";
import Authentication from "./components/Authentication";
import AuthProvider from "./context/AuthContext";
import Layout from "./components/Layout";
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="anime-details/:id" element={<AnimeDetails />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route element={<Authentication />}>
            <Route path="my-anime" element={<MyAnime name="jamiu" />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
