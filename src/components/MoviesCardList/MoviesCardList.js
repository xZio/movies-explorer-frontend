import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useScreenWidth } from "../../hooks/useScreenWidth";
import { CARDS_TO_RENDER } from "../../utils/constants";
import { mainApi } from "../../utils/MainApi";
import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css";

function MoviesCardList({
  filteredMovies,
  savedMovies,
  //shortMovies,
  filteredSavedMovies,
  //savedShortMovies,
  isNothing,
  isError,
  isShort,
  onCardClick,
 // isSaved,
  onDeleteClick,
}) {
  const location = useLocation();
  const screenWidth = useScreenWidth();
  const { display, pad, mobile } = CARDS_TO_RENDER;
  const [renderOptions, setRenderOptions] = useState({});
  const [moviesToRender, setMoviesToRender] = useState([]);

  //меняем параметры добавления фильмов на кнопку "Еще" в зависимости от ширины экрана
  useEffect(() => {
    if (screenWidth > display.width) {
      setRenderOptions(display.movies);
      return;
    }
    if (screenWidth < display.width && screenWidth > mobile.width) {
      setRenderOptions(pad.movies);
      return;
    }
    setRenderOptions(mobile.movies);
  }, [display, pad, mobile, screenWidth, setRenderOptions]);

  useEffect(() => {
    if (location.pathname === "/movies") {
      setMoviesToRender(filteredMovies.slice(0, renderOptions.start));
      return;
    }
    setMoviesToRender(filteredSavedMovies.slice(0, renderOptions.start));
  }, [filteredMovies, renderOptions, location, filteredSavedMovies]);
  /* useEffect(() => {
    if (isShort && location.pathname === "/movies") {
      setMoviesToRender(shortMovies);
      return;
    }

    if (location.pathname === "/saved-movies") {
      if (isShort) {
        setMoviesToRender(savedShortMovies);
        return;
      }
      setMoviesToRender(savedMovies);
      return;
    }

    setMoviesToRender(filteredMovies.slice(0, renderOptions.start));
  }, [
    filteredMovies,
    shortMovies,
    renderOptions,
    isShort,
    savedMovies,
    location,
    savedShortMovies,
  ]); */

  function addMoreMovies() {
    /* if (isShort) {
      setMoviesToRender(
        shortMovies.slice(0, moviesToRender.length + renderOptions.more)
      );
      return;
    } */
    setMoviesToRender(
      filteredMovies.slice(0, moviesToRender.length + renderOptions.more)
    );
  }

  function filterSavedMovies(movie) {
    return savedMovies.find((m) => m.movieId === movie.id);
  }

  return (
    <section className="movies-cardlist">
      {isNothing && (
        <p className="movies-cardlist__nothing-find">Ничего не найдено</p>
      )}
      {isError && (
        <p className="movies-cardlist__nothing-find movies-cardlist__error">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз.
        </p>
      )}
      <ul className="movies-cardlist__list">
        {moviesToRender.map((movie) => {
          return (
            <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              onCardClick={onCardClick}
              isSaved={filterSavedMovies(movie)}
              onDeleteClick={onDeleteClick}
            />
          );
        })}
      </ul>
      {location.pathname === "/movies" && moviesToRender < filteredMovies && (
        <button
          className="movies-cardlist__more-button"
          type="button"
          onClick={addMoreMovies}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
