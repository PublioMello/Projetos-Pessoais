import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

app.get("/api/movies", async (req, res) => {
  try {
    const response = await fetch("https://api.themoviedb.org/3/movie/popular", {
      headers: {
        Authorization: `Bearer ${process.env.MOVIE_KEY_API}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar filmes");
    }

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao buscar filmes",
    });
  }
});

app.listen(3000, () => {
  console.log("Backend rodando em http://localhost:3000");
});
