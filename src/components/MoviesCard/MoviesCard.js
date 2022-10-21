import "./MoviesCard.css";
import saved from "../../images/saved-img.svg";
import { useLocation } from "react-router-dom";
import { ALL_MOVIES_URL } from "../../utils/constants";
import { mainApi } from "../../utils/MainApi";
import { useState } from "react";

function MoviesCard({ movie, onCardClick, isSaved, onDeleteClick }) {
  const location = useLocation();
  const imageUrl = `${ALL_MOVIES_URL}${movie.image.url}`;

  const duration =
    movie.duration < 60
      ? `${movie.duration}м`
      : `${Math.trunc(movie.duration / 60)}ч ${movie.duration % 60}м`;

  function handleClick() {
    onCardClick(movie);
  }

  function handleDelete() {
    onDeleteClick(movie);
  }

  return (
    <li className="movies-card__item">
      <article className="movies-card">
        <a target="_blank" rel="noreferrer" href={movie.trailerLink}>
          <img className="movies-card__image" src={imageUrl} alt="превью"></img>
        </a>

        {location.pathname === "/saved-movies" ? (
          <>
            <button
              className="movies-card__saved-img movies-card__unsaved-button"
              type="button"
              onClick={handleDelete}
            ></button>
          </>
        ) : (
          !isSaved && (
            <>
              <button
                type="button"
                className={"movies-card__save-button"}
                onClick={handleClick}
              >
                Сохранить
              </button>
              <img
                className="movies-card__saved-img"
                alt="Иконка: Фильм сохранён"
                src={saved}
              />
            </>
          )
        )}

        <div className="movies-card__description">
          <h2 className="movies-card__name"> {movie.nameRU} </h2>
          <span className="movies-card__duration"> {duration}</span>
        </div>
      </article>
    </li>
  );
}

export default MoviesCard;
