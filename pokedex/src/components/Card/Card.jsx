import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

function Card({ image, name, type1, type2, number }) {
  return (
    <Link to={`/pokemon/${number}`} className="pokemon-card-link">
      <div className="card">
        <div className="card__up">
          <img
            src={image}
            alt="Picture of the pokemon"
            className="card__up-image"
          />
          <p>{String(number).padStart(4, "0")}</p>
        </div>
        <div className="card__down">
          <p className="card__down-name">{name}</p>
          <div className="card__down-types">
            <li className="card__down-types-1">{type1}</li>
            {type2 && <li className="card__down-types-2">{type2}</li>}
          </div>
        </div>

        {/* <button onClick={searchPokemon}>procurar pookemon</button> */}
      </div>
    </Link>
  );
}

export default Card;
