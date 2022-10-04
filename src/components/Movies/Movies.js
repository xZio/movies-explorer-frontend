import "./Movies.css";
import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies({getMovies}) {

React.useEffect(()=> {
  getMovies();
})

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
