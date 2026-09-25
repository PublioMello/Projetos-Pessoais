import React from "react";
import "./Card.css";

// O TMDb devolve só o caminho da imagem (ex: "/abc.jpg"), então precisamos
// juntar com a URL base. "w500" é a largura do pôster (500px).
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// Card que exibe as informações de um filme
function Card({ title, poster, overView, rating, releaseDate }) {
  // Pega só o ano da data de lançamento (formato "AAAA-MM-DD")
  const year = releaseDate ? releaseDate.slice(0, 4) : null;

  // Só mostra a nota se ela existir e for maior que zero
  // (filmes sem avaliações vêm com nota 0)
  const hasRating = typeof rating === "number" && rating > 0;

  return (
    <article className="card">
      {/* Área do pôster */}
      <div className="card_poster">
        {poster ? (
          // loading="lazy" só carrega a imagem quando ela aparece na tela
          <img
            src={`${IMAGE_BASE_URL}${poster}`}
            alt={`Pôster de ${title}`}
            className="card_poster-picture"
            loading="lazy"
          />
        ) : (
          // Mostrado quando o filme não tem pôster cadastrado
          <div className="card_poster-fallback">Sem imagem</div>
        )}

        {/* Selo com a nota, posicionado sobre o pôster */}
        {hasRating && (
          <span className="card_rating">★ {rating.toFixed(1)}</span>
        )}
      </div>

      {/* Área de texto: título, ano e sinopse */}
      <div className="card_body">
        {/* O atributo title mostra o nome completo ao passar o mouse,
            já que títulos longos são cortados com "..." no CSS */}
        <h3 className="card_title" title={title}>
          {title}
        </h3>
        {year && <span className="card_year">{year}</span>}

        {/* Alguns filmes vêm sem sinopse, então usamos um texto padrão */}
        <p className="card_overView">
          {overView || "Sinopse não disponível."}
        </p>
      </div>
    </article>
  );
}

export default Card;
