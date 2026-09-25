import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Carrega as variáveis do arquivo .env
dotenv.config();

// Cria a aplicação Express
const app = express();

// Permite requisições vindas do frontend (ex: React na porta 5173)
app.use(cors());

// Rota para buscar filmes populares da API do TMDb
app.get("/api/movies", async (req, res) => {
  try {
    // Faz a requisição para a API externa de filmes populares
    // Obs: MOVIE_KEY_API é uma API Key v3 (hex), por isso vai como query param
    // "api_key". Se um dia trocar para um Access Token v4 (JWT), aí sim usa
    // o header "Authorization: Bearer".
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_KEY_API}`,
    );

    // Verifica se a resposta da API foi bem-sucedida
    if (!response.ok) {
      throw new Error("Error searching movie");
    }

    // Converte a resposta para JSON
    const data = await response.json();

    // Envia os filmes para o frontend
    res.json(data);
  } catch (error) {
    // Loga o erro no terminal
    console.error(error);

    // Retorna erro 500 para o cliente
    res.status(500).json({
      error: "Erro ao buscar filmes",
    });
  }
});

app.get("/api/search", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_KEY_API}&query=${searched_movie}`,
    );
    if (!response.ok) {
      throw new Error("Error searching movie");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error searching movie",
    });
  }
});

// Inicia o servidor na porta 3000
app.listen(3001, () => {
  console.log("Backend rodando em http://localhost:3001");
});
