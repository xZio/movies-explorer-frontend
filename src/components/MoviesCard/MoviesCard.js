import "./MoviesCard.css";
import movie from "../../images/movie_pic(временно).png";
function MoviesCard() {
  return (
    <li className="movies-card__item">
      <article className="movies-card">
        <a target="_blank" rel="noreferrer" href="https://www.youtube.com/">
          <img className="movies-card__image" src={movie} alt=""></img>
        </a>
        <button className="movies-card__save-button">Сохранить</button>
        <div className="movies-card__description">
          <h2 className="movies-card__name"> Бег это свобода </h2>
          <span className="movies-card__duration"> 1ч 17м</span>
        </div>
      </article>
    </li>
  );
}

export default MoviesCard;
