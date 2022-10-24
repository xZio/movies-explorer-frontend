import { SHORT_MOVIE_DURATION } from "./constants";

//фильтрация фильмов по ключевому слову
function filterMovies(movies, inputValue) {
  return movies.filter((movie) => {
    return movie.nameRU.toLowerCase().includes(inputValue.toLowerCase());
  });
}

//фильтрация фильмов по состоянию чекбокса
function filterCheckbox(movies) {
  return movies.filter((movie) => {
    return movie.duration < SHORT_MOVIE_DURATION;
  });
}

export { filterMovies, filterCheckbox };
