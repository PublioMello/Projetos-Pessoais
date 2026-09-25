import React from "react";
import "./Head.css";
import poster from "../../assets/cinema.jpg";

// Cabeçalho com imagem de fundo, logo e campo de busca
function Head({ query = "", onQueryChange }) {
  return (
    <header className="hero">
      {/* Imagem decorativa, por isso o alt vazio */}
      <img src={poster} alt="" className="hero-image" />

      {/* Camada escura sobre a imagem para o texto ficar legível */}
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-title">
          Publio<span className="hero-title-accent">Search</span>Movies
        </h1>

        <div className="hero-search-wrap">
          {/* Ícone de lupa desenhado em SVG, posicionado dentro do input */}
          <svg
            className="hero-search-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" />
          </svg>
          <input
            type="search"
            className="hero-search"
            placeholder="Buscar filme..."
            aria-label="Buscar filme"
            value={query}
            onChange={(event) => onQueryChange?.(event.target.value)}
          />
        </div>
      </div>
    </header>
  );
}

export default Head;
