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

  function handleCheck() {
    setIsShort(!isShort);
    localStorage.setItem("checkbox", !isShort);

    isShort
      ? setFilteredSavedMovies(savedMovies)
      : setFilteredSavedMovies(filterCheckbox(savedMovies));
  }

  function searchResult(inputValue, isShort) {
    const filterResult = filterMovies(savedMovies, inputValue);

    if (filterResult.length === 0) {
      setFilteredSavedMovies([]);
      setIsNothing(true);
      return;
    }

    setFilteredSavedMovies(filterResult);
    if (isShort) {
      setFilteredSavedMovies(filterCheckbox(filterResult));
      return;
    }
  }
  useEffect(() => {
    filteredSavedMovies.length !== 0 ? setIsNothing(false) : setIsNothing(true);
  }, [filteredSavedMovies]);

  useEffect(() => {
    setFilteredSavedMovies(savedMovies);
  }, [savedMovies]);

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
