import "./MoviesCard.css";
import movie from "../../images/movie_pic(временно).png";
import saved from "../../images/saved-img.svg";
import { useLocation } from "react-router-dom";

function MoviesCard() {
  const location = useLocation();
  function handleSaveCard(e) {
    e.target.classList.add("movies-card__save-button_invisible");
  }
  return (
    <li className="movies-card__item">
      <article className="movies-card">
        <a target="_blank" rel="noreferrer" href="https://www.youtube.com/">
          <img className="movies-card__image" src={movie} alt="превью"></img>
        </a>

        {location.pathname === "/saved-movies" ? (
          <>
            <button
              className="movies-card__saved-img movies-card__unsaved-button"
              type="button"
            ></button>
          </>
        ) : (
          <>
            <button
              type="button"
              className={"movies-card__save-button"}
              onClick={handleSaveCard}
            >
              Сохранить
            </button>
            <img
              className="movies-card__saved-img"
              alt="Иконка: Фильм сохранён"
              src={saved}
            />
          </>
        )}

        <div className="movies-card__description">
          <h2 className="movies-card__name"> Бег это свобода </h2>
          <span className="movies-card__duration"> 1ч 17м</span>
        </div>
      </article>
    </li>
  );
}

export default MoviesCard;
