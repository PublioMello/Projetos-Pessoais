import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PokemonPage.css";

const statLabels = {
  hp: "HP",
  attack: "Atack",
  defense: "Deffense",
  "special-attack": "Sspecial Attack",
  "special-defense": "Special deffense",
  speed: "Speed",
};

function formatName(name = "") {
  return name
    .replace("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function PokemonPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [weaknesses, setWeaknesses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let isCurrent = true;

    async function fetchPokemon() {
      try {
        const pokemonResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`,
        );
        if (!pokemonResponse.ok) {
          navigate("/erro", { replace: true });
          return;
        }

        const data = await pokemonResponse.json();
        const speciesResponse = await fetch(data.species.url);
        const speciesData = speciesResponse.ok
          ? await speciesResponse.json()
          : null;
        const typeResponses = await Promise.all(
          data.types.map(({ type }) => fetch(type.url)),
        );
        const typeData = await Promise.all(
          typeResponses
            .filter((response) => response.ok)
            .map((response) => response.json()),
        );
        const weaknessNames = [
          ...new Set(
            typeData.flatMap((type) =>
              type.damage_relations.double_damage_from.map(({ name }) => name),
            ),
          ),
        ];

        if (isCurrent) {
          setPokemon(data);
          setSpecies(speciesData);
          setWeaknesses(weaknessNames);
        }
      } catch {
        if (isCurrent) navigate("/erro", { replace: true });
      }
    }
    fetchPokemon();

    return () => {
      isCurrent = false;
    };
  }, [id, navigate]);

  if (!pokemon) {
    return (
      <main className="pokemon-page pokemon-page--loading">
        Carregando dados...
      </main>
    );
  }

  const pokemonId = Number(id);
  const image =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ??
    pokemon.sprites?.front_default;
  const category = species?.genera?.find(
    ({ language }) => language.name === "en",
  )?.genus;
  const statTotal = pokemon.stats.reduce(
    (total, { base_stat: value }) => total + value,
    0,
  );

  return (
    <main
      className={`pokemon-page pokemon-page--${pokemon.types[0].type.name}`}
    >
      <div className="pokemon-page__topbar">
        <button
          className="pokemon-page__nav-button"
          type="button"
          disabled={pokemonId <= 1}
          onClick={() => navigate(`/pokemon/${pokemonId - 1}`)}
        >
          <span aria-hidden="true">←</span> Anterior
        </button>
        <button
          className="pokemon-page__nav-button"
          type="button"
          onClick={() => navigate(`/pokemon/${pokemonId + 1}`)}
        >
          Próximo <span aria-hidden="true">→</span>
        </button>
      </div>

      <section className="pokemon-hero">
        <div className="pokemon-hero__copy">
          <p className="pokemon-page__eyebrow">
            Pokédex / registro #{String(id).padStart(4, "0")}
          </p>
          <h1
            className={`pokemon-hero__name ${
              pokemon.name.length > 12 ? "pokemon-hero__name--long" : ""
            } ${pokemon.name.includes("-") ? "pokemon-hero__name--two-words" : ""}`}
          >
            {formatName(pokemon.name)}
          </h1>
          <p className="pokemon-hero__category">{category ?? "Pokemon"}</p>
          <div className="type-list" aria-label="Tipos">
            {pokemon.types.map(({ type }) => (
              <span
                className={`type-badge type-badge--${type.name}`}
                key={type.name}
              >
                {formatName(type.name)}
              </span>
            ))}
          </div>
          <div className="quick-facts">
            <div>
              <strong>{(pokemon.height / 10).toFixed(1)} m</strong>
              <span>Altura</span>
            </div>
            <div>
              <strong>{(pokemon.weight / 10).toFixed(1)} kg</strong>
              <span>Peso</span>
            </div>
            <div>
              <strong>{statTotal}</strong>
              <span>Total base</span>
            </div>
          </div>
        </div>
        <div className="pokemon-hero__art">
          <span className="pokemon-hero__number">
            #{String(id).padStart(3, "0")}
          </span>
          <img src={image} alt={`Ilustração de ${formatName(pokemon.name)}`} />
        </div>
      </section>

      <section className="pokemon-content">
        <article className="info-panel stats-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">Performance</p>
              <h2>Estatísticas</h2>
            </div>
            <span className="panel-total">{statTotal} pts</span>
          </div>
          <div className="stats-list">
            {pokemon.stats.map(({ base_stat: value, stat }) => (
              <div className="stat-row" key={stat.name}>
                <div className="stat-row__label">
                  <span>{statLabels[stat.name] ?? formatName(stat.name)}</span>
                  <strong>{value}</strong>
                </div>
                <div className="stat-row__track">
                  <span style={{ width: `${Math.min(value / 2.55, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="info-panel details-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">Identidade</p>
              <h2>Detalhes</h2>
            </div>
          </div>
          <dl className="details-list">
            <div>
              <dt>Habilidades</dt>
              <dd>
                {pokemon.abilities
                  .map(({ ability }) => formatName(ability.name))
                  .join(", ")}
              </dd>
            </div>
            <div>
              <dt>Categoria</dt>
              <dd>{category ?? "-"}</dd>
            </div>
            <div>
              <dt>Experiência base</dt>
              <dd>{pokemon.base_experience ?? "-"}</dd>
            </div>
            <div>
              <dt>Gênero</dt>
              <dd>
                {species?.gender_rate === -1 ? "Sem gênero" : "Macho / Fêmea"}
              </dd>
            </div>
          </dl>
        </article>

        <article className="info-panel type-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">Afinidades</p>
              <h2>Tipos</h2>
            </div>
          </div>
          <div className="type-list type-list--large">
            {pokemon.types.map(({ type }) => (
              <span
                className={`type-badge type-badge--${type.name}`}
                key={type.name}
              >
                {formatName(type.name)}
              </span>
            ))}
          </div>
          <h3>Fraquezas</h3>
          <div className="weakness-list">
            {weaknesses.map((weakness) => (
              <span key={weakness}>{formatName(weakness)}</span>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

export default PokemonPage;
