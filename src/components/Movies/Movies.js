import "./Movies.css";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import { moviesApi } from "../../utils/MoviesApi";
import { filterCheckbox, filterMovies } from "../../utils/utils";

function Movies({ onCardClick, savedMovies }) {
  const [allSaerchMovies, setAllSearchMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShort, setIsShort] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNothing, setIsNothing] = useState(false);
  const [isError, setIsError] = useState(false);

  //получаем список всех фильмов от сервера
  function getAllMovies() {
    setFilteredMovies([]);
    setIsNothing(false);
    setIsLoading(true);
    return moviesApi
      .getMovies()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setIsLoading(false);
      });
  }

  // отфильтрованные фильмы в зависимости от поиска и состояния чекбокса
  function searchResult(inputValue, isShort) {
    localStorage.setItem("searchText", inputValue);
    localStorage.setItem("checkbox", isShort);
    getAllMovies()
      .then((data) => {
        setIsLoading(false);
        const filterResult = filterMovies(data, inputValue);
        if (filterResult.length === 0) {
          setIsNothing(true);
        }

        setAllSearchMovies(filterResult);
        if (isShort) {
          setFilteredMovies(filterCheckbox(filterResult));
          return;
        }
        localStorage.setItem("movies", JSON.stringify(filterResult));
        setFilteredMovies(filterResult);
      })
      .catch((err) => console.err);
  }

  function handleCheck() {
    setIsShort(!isShort);
    localStorage.setItem("checkbox", !isShort);

    isShort
      ? setFilteredMovies(allSaerchMovies)
      : setFilteredMovies(filterCheckbox(allSaerchMovies));
  }

  useEffect(() => {
    if (localStorage.movies) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      setFilteredMovies(movies);
      setAllSearchMovies(movies);
      setIsShort(JSON.parse(localStorage.getItem("checkbox")));
      return;
    }
  }, []);

  useEffect(() => {
    isShort && setFilteredMovies(filterCheckbox(allSaerchMovies));
  }, [isShort, allSaerchMovies]);

  useEffect(() => {
    filteredMovies.length !== 0 || isLoading
      ? setIsNothing(false)
      : setIsNothing(true);
  }, [filteredMovies, isLoading]);

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm
          searchResult={searchResult}
          onCheck={handleCheck}
          isShort={isShort}
        />
        {isLoading && <Preloader />}
        <MoviesCardList
          filteredMovies={filteredMovies}
          //shortMovies={shortMovies}
          isNothing={isNothing}
          isError={isError}
          isShort={isShort}
          onCardClick={onCardClick}
          savedMovies={savedMovies}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
