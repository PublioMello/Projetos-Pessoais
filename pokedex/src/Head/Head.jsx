import React, { useState } from "react";
import pokemonLogo from "../assets/pokemon2.png";
import "./head.css";
import { Link, useNavigate } from "react-router-dom";

const Head = () => {
  const navigate = useNavigate();
  const tipos = ["Fogo", "Planta", "Inseto", "Água"];
  const jogos = ["Red", "Yellow", "Silver", "Sapphire"];
  const [menuAberto, setMenuAberto] = useState(null);

  function alternarMenu(menu) {
    setMenuAberto(menuAberto === menu ? null : menu);
  }

  return (
    <header className="head">
      <div className="head__left">
        <Link to="/">
          <img src={pokemonLogo} alt="Logo do pokemon" className="head-logo" />
        </Link>
      </div>
      <nav className="head__right" aria-label="Filtros da Pokédex">
        <ul className="head__navigation">
          <li className="head__menu">
            <button
              type="button"
              className="head__menu-trigger"
              onClick={() => alternarMenu("tipos")}
              aria-expanded={menuAberto === "tipos"}
            >
              Tipos <span>⌄</span>
            </button>
            <ul
              className={`head__submenu ${menuAberto === "tipos" ? "is-open" : ""}`}
            >
              {tipos.map((tipo) => (
                <li key={tipo}>
                  <button type="button">{tipo}</button>
                </li>
              ))}
            </ul>
          </li>
          {/* <li className="head__menu">
            <button
              type="button"
              className="head__menu-trigger"
              onClick={() => alternarMenu("jogos")}
              aria-expanded={menuAberto === "jogos"}
            >
              Jogos <span>⌄</span>
            </button>
            <ul
              className={`head__submenu ${menuAberto === "jogos" ? "is-open" : ""}`}
            >
              {jogos.map((jogo) => (
                <li key={jogo}>
                  <button type="button">{jogo}</button>
                </li>
              ))}
            </ul>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Head;
