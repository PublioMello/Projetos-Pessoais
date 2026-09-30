import React, { useEffect, useState } from "react";
import Head from "./components/Head/Head";
import Body from "./components/Body/Body";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    // Debounce: espera o usuário parar de digitar antes de buscar
    const timer = setTimeout(() => {
      setLoading(true);
      setError(null);

      const url = query.trim()
        ? `http://localhost:3001/api/movies/search?query=${encodeURIComponent(query)}`
        : "http://localhost:3001/api/movies";

      fetch(url, { signal: controller.signal })
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.results || []);
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            console.error("Error searching movies:", error);
            setError("It wasn't possible to load the movies.");
          }
        })
        .finally(() => setLoading(false));
    }, 400);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <div>
      <Head query={query} onQueryChange={setQuery} />
      <Body movies={movies} loading={loading} error={error} />
    </div>
  );
}

export default App;
