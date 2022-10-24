import { useEffect, useState } from "react";
import { filterCheckbox, filterMovies } from "../../utils/utils";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({ savedMovies, isLoading, onDeleteClick }) {
  const [isShort, setIsShort] = useState(false);
  const [isNothing, setIsNothing] = useState(false);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [allSearchSavedMovies, setAllSearchSavedMovies] = useState([]);

  function handleCheck() {
    setIsShort(!isShort);
    localStorage.setItem("saved-checkbox", !isShort);

    isShort
      ? setFilteredSavedMovies(allSearchSavedMovies)
      : setFilteredSavedMovies(filterCheckbox(allSearchSavedMovies));
  }

  function searchResult(inputValue, isShort) {
    const filterResult = filterMovies(savedMovies, inputValue);
    localStorage.setItem("saved-search-text", inputValue);
    localStorage.setItem("saved-checkbox", isShort);
    localStorage.setItem("saved-movies", JSON.stringify(filterResult));
    if (filterResult.length === 0) {
      setFilteredSavedMovies([]);
      setAllSearchSavedMovies([]);
      setIsNothing(true);
      localStorage.setItem("saved-movies", "[]");
      return;
    }
    setAllSearchSavedMovies(filterResult);
    setFilteredSavedMovies(filterResult);
    if (isShort) {
      setFilteredSavedMovies(filterCheckbox(filterResult));
      return;
    }
  }

  /* useEffect(() => {
    if (localStorage.getItem("saved-movies")) {
      setIsShort(JSON.parse(localStorage.getItem("saved-checkbox")));
      setFilteredSavedMovies(JSON.parse(localStorage.getItem("saved-movies")));
      isShort &&
      setFilteredSavedMovies(
        filterCheckbox(JSON.parse(localStorage.getItem("saved-movies")))
      );
    }
    
  }, [isShort, setFilteredSavedMovies]); */

  useEffect(() => {
    if (localStorage.getItem("saved-movies")) {
      const movies = JSON.parse(localStorage.getItem("saved-movies"));
      setFilteredSavedMovies(movies);
      setAllSearchSavedMovies(movies);
      setIsShort(JSON.parse(localStorage.getItem("saved-checkbox")));
      return;
    }
    setFilteredSavedMovies(savedMovies);
    setAllSearchSavedMovies(savedMovies);
  }, [savedMovies]);

  useEffect(() => {
    filteredSavedMovies.length !== 0 ? setIsNothing(false) : setIsNothing(true);
  }, [filteredSavedMovies]);

  useEffect(() => {
    isShort && setFilteredSavedMovies(filterCheckbox(allSearchSavedMovies));
  }, [isShort, allSearchSavedMovies]);

  /*  useEffect(() => {
    setFilteredSavedMovies(savedMovies);
  }, [savedMovies]); */

  return (
    <>
      <Header />
      <SearchForm
        searchResult={searchResult}
        onCheck={handleCheck}
        isShort={isShort}
      />
      {isLoading && <Preloader />}
      <MoviesCardList
        isNothing={isNothing}
        savedMovies={savedMovies}
        filteredSavedMovies={filteredSavedMovies}
        onDeleteClick={onDeleteClick}
      />
      <Footer />
    </>
  );
}

export default SavedMovies;
