import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList() {
  return (
    <section className="movies-cardlist">
      <ul className="movies-cardlist__list">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>

      <button className="movies-cardlist__more-button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
