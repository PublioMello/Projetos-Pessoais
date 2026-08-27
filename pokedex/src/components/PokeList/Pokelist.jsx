import React, { useState, useEffect } from "react";
import Card from "../Card/Card.jsx";

function Pokelist() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");
  const pageSize = 12;

  async function fetchPokemon(offset = 0) {
    const isInitialLoad = offset === 0;

    if (isInitialLoad) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`,
      );

      if (!response.ok) {
        throw new Error("Não foi possível carregar os Pokémon");
      }

      const data = await response.json();
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const result = await fetch(pokemon.url);

          if (!result.ok) {
            throw new Error("Não foi possível carregar os detalhes");
          }

          return result.json();
        }),
      );

      setPokemons((currentPokemons) => {
        const allPokemons = isInitialLoad
          ? pokemonDetails
          : [...currentPokemons, ...pokemonDetails];

        return allPokemons.sort((a, b) => a.id - b.id);
      });
      setHasMore(Boolean(data.next));
      setError("");
    } catch (requestError) {
      console.error("Erro ao carregar os pokémon:", requestError);
      setError("Não foi possível carregar os Pokémon. Tente novamente.");
    } finally {
      if (isInitialLoad) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  }

  useEffect(() => {
    fetchPokemon();
  }, []);

  function loadMore() {
    if (!loadingMore && hasMore) {
      fetchPokemon(pokemons.length);
    }
  }

  return (
    <div className="poke-list-container">
      {loading ? (
        <p>Carregando Pokémon...</p>
      ) : (
        <>
          <div className="poke-list">
            {pokemons.map((poke) => (
              <Card
                key={poke.id}
                image={
                  poke.sprites.other["official-artwork"].front_default ||
                  poke.sprites.front_default
                }
                name={poke.name}
                type1={poke.types[0]?.type.name}
                type2={poke.types[1]?.type.name}
                number={poke.id}
              />
            ))}
          </div>

          {error && <p className="load-more-error">{error}</p>}
          {hasMore && (
            <button
              className="load-more-button"
              type="button"
              onClick={loadMore}
              disabled={loadingMore}
            >
              {loadingMore ? "Carregando..." : "Carregar mais"}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Pokelist;
