import React from "react";

function Body({ movies = [], loading = false, error = null }) {
  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : loading ? (
        <p>Loading movies...</p>
      ) : movies.length === 0 ? (
        <p>Nenhum filme encontrado.</p>
      ) : (
        movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={200}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Body;
