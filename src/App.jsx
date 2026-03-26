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
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="anime-details/:id" element={<AnimeDetails />} />
          <Route
            element={
              <AuthProvider>
                <Authentication />
              </AuthProvider>
            }
          >
            <Route path="my-anime" element={<MyAnime name="jamiu" />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
