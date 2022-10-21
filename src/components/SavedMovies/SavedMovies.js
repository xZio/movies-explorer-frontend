import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";
import { mainApi } from "../../utils/MainApi";
import { filterCheckbox } from "../../utils/utils";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({
  savedMovies,
  savedShortMovies,
  //  savedShortMovies,
  //searchResult,
  //isNothing,
  isLoading,
  //isError,
  //isShort,
  // onChange,
  onDeleteClick,
}) {
  const [isShort, setIsShort] = useState(false);

  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  function handleCheck() {
    setIsShort(!isShort);

    isShort
      ? setFilteredSavedMovies(savedMovies)
      : setFilteredSavedMovies(savedShortMovies);

    //filteredMovies.length !== 0 ? setIsNothing(false) : setIsNothing(true);
  }

  useEffect(() => {
    isShort
      ? setFilteredSavedMovies(savedShortMovies)
      : setFilteredSavedMovies(savedMovies);
  }, [savedMovies, savedShortMovies, isShort]);

  return (
    <>
      <Header />
      <SearchForm
        //searchResult={searchResult}
        onCheck={handleCheck}
        isShort={isShort}
      />
      {isLoading && <Preloader />}
      <MoviesCardList
        // isNothing={isNothing}
        // isError={isError}
        savedMovies={savedMovies}
        filteredSavedMovies={filteredSavedMovies}
        // savedShortMovies={savedShortMovies}
        //isShort={isShort}
        onDeleteClick={onDeleteClick}
      />
      <Footer />
    </>
  );
}

export default SavedMovies;
