import React from "react";
import "./Head.css";
import poster from "../../assets/cinema.jpg";

function Head() {
  return (
    <header className="hero">
      <img src={poster} alt="Filme" className="hero-image" />

      <div className="hero-content">
        <h1 className="hero-title">PublioSearchMovies</h1>

        <div className="hero-search-wrap">
          <input
            type="text"
            className="hero-search"
            placeholder="Search Movie..."
            aria-label="Search Movie"
          />
        </div>
      </div>
    </header>
  );
}

export default Head;
