import React, { useState } from "react";
import pokemonLogo from "../assets/pokemon2.png";
import "./head.css";
import { Link, useNavigate } from "react-router-dom";

const Head = () => {
  const types = ["Fire", "Plant", "Insect", "Water"];
  const games = ["Red", "Yellow", "Silver", "Sapphire"];
  const [menuAberto, setMenuAberto] = useState(null);

  function alternarMenu(menu) {
    setMenuAberto(menuAberto === menu ? null : menu);
  }

  return (
    <header className="head">
      <div className="head__left">
        <Link to="/">
          <img src={pokemonLogo} alt="Pokemon Logo" className="head-logo" />
        </Link>
      </div>
      <nav className="head__right" aria-label="Filtros da Pokédex">
        <ul className="head__navigation">
          <li className="head__menu">
            <button
              type="button"
              className="head__menu-trigger"
              onClick={() => alternarMenu("types")}
              aria-expanded={menuAberto === "types"}
            >
              Types <span>⌄</span>
            </button>
            <ul
              className={`head__submenu ${menuAberto === "types" ? "is-open" : ""}`}
            >
              {types.map((type) => (
                <li key={type}>
                  <button type="button">{type}</button>
                </li>
              ))}
            </ul>
          </li>
          {/* <li className="head__menu">
            <button
              type="button"
              className="head__menu-trigger"
              onClick={() => alternarMenu("games")}
              aria-expanded={menuAberto === "games"}
            >
              Games <span>⌄</span>
            </button>
            <ul
              className={`head__submenu ${menuAberto === "games" ? "is-open" : ""}`}
            >
              {games.map((jogo) => (
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
