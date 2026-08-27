import React, { useState } from "react";
import Card from "../../components/Card/Card.jsx";
import Pokelist from "../../components/PokeList/Pokelist.jsx";
import "./Body.css";

function Body() {
  // Estado do texto que o usuário digita na busca
  const [search, setSearch] = useState("");
  // Estado para guardar o pokémon encontrado em uma pesquisa específica
  const [pokemon, setPokemon] = useState(null);
  // Estado para mostrar mensagens de erro quando a busca falha
  const [error, setError] = useState("");

  async function searchPokemon(event) {
    event.preventDefault();

    const value = search.trim();
    if (!value) {
      // Se o campo estiver vazio, não faz fetch
      setError("Write the name of the Pokemon you want to search");
      setPokemon(null);
      return;
    }

    try {
      // Busca o pokémon na API pelo nome digitado
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`,
      );

      if (!response.ok) {
        throw new Error("Pokémon não encontrado");
      }

      const data = await response.json();
      setPokemon(data);
      setError("");
      setSearch("");
    } catch (err) {
      // Se a busca falhar, limpa o card e mostra mensagem
      setPokemon(null);
      setError("Pokémon Not Found. Try a different name");
    }
  }

  return (
    <main className="page-shell">
      <section className="search-panel">
        <p className="eyebrow">Pokédex</p>
        <h1> Find your favorite Pokemon</h1>

        <form className="search-form" onSubmit={searchPokemon}>
          <input
            className="search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search the pokemon"
            aria-label="Buscar pokémon"
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>

        {error && <p className="search-error">{error}</p>}
      </section>

      <section className="result-panel">
        {/*
          Se existir um pokémon pesquisado, mostra somente o card dele.
          Caso contrário, mostra a lista completa embaixo da busca.
        */}
        {pokemon ? (
          <Card
            image={pokemon.sprites.other["official-artwork"].front_default}
            name={pokemon.name}
            type1={pokemon.types[0]?.type.name}
            type2={pokemon.types[1]?.type.name}
            number={pokemon.id}
          />
        ) : (
          <Pokelist />
        )}
      </section>
    </main>
  );
}

export default Body;
