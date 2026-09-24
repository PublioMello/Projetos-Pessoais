import React, { useEffect, useState } from "react";
import Head from "./components/Head/Head";
import Body from "./components/Body/Body";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/movies")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results || []);
      })
      .catch((error) => {
        console.error("Error searching movies:", error);
      });
  }, []);
  console.log(movies);
  return (
    <div>
      <Head />
      <Body movies={movies} />
    </div>
  );
}

export default App;
