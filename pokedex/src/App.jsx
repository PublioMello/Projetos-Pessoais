import React from "react";
import Head from "./Head/Head.jsx";
import Body from "./MainPage/Body/Body.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonPage from "./components/PokemonPage/PokemonPage.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import TypesPage from "./components/TypesPage/TypesPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Head />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Body />} />
        <Route path="/pokemon/:id" element={<PokemonPage />} />
        <Route path="/types/:type" element={<TypesPage />} />
        <Route path="/erro" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
