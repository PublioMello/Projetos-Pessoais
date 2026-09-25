import React from "react";
import Card from "../Card/Card";

function Body({ movies = [], loading = false, error = null }) {
  if (error) return <p className="movie-status">{error}</p>;
  if (loading) return <p className="movie-status">Loading movies...</p>;
  if (movies.length === 0)
    return <p className="movie-status">Nenhum filme encontrado.</p>;

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <Card
          key={movie.id}
          title={movie.title}
          poster={movie.poster_path}
          overView={movie.overview}
          rating={movie.vote_average}
          releaseDate={movie.release_date}
        />
      ))}
    </div>
  );
}

export default Body;
