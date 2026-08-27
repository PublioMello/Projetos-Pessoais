import React from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <main className="error-page">
      <section className="error-page__content" aria-labelledby="error-title">
        <div className="error-page__mark" aria-hidden="true" />
        <p className="error-page__eyebrow">Sinal perdido</p>
        <h1 id="error-title">Essa página fugiu!</h1>
        <p className="error-page__message">
          Não encontramos o endereço que você procurou. Volte para a Pokédex ou
          tente acessar a página novamente.
        </p>
        <div className="error-page__actions">
          <button
            className="error-page__button"
            type="button"
            onClick={() => navigate("/")}
          >
            Voltar para a Pokédex
          </button>
          <button
            className="error-page__button error-page__button--secondary"
            type="button"
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </button>
        </div>
      </section>
    </main>
  );
}

export default ErrorPage;
