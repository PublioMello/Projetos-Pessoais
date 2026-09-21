import React from "react";
import "./Head.css";
import poster from "../../assets/cinema.jpg";

function Head() {
  return (
    <header className="hero">
      <img src={poster} alt="Filme" className="hero-image" />

      <div className="hero-content">
        <h1>PublioSearchMovies</h1>
      </div>
    </header>
  );
}

export default Head;
