import React from "react";
import Head from "./components/Head/Head";
import Body from "./components/Body/Body";

function App() {
  fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=SUA_API_KEY&language=pt-BR`,
  )
    .then((response) => response.json())
    .then((data) => console.log(data.results));

  return (
    <div>
      <Head />
      <Body />
    </div>
  );
}

export default App;
