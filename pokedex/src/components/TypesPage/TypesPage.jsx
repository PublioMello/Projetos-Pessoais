import React from "react";
import { useParams } from "react-router-dom";

function TypesPage() {
  const { type } = useParams();
  async function fetchPokemon(type) {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);

    const data = await response.json();
    console.log(data);
  }

  return <div>TypesPage</div>;
}

export default TypesPage;
