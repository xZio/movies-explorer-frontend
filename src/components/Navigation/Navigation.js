import "./Navigation.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import icon from "../../images/account_icon.svg";
import Burger from "../Burger/Burger";

function Navigation({ loggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleAccount() {
    navigate("/profile");
  }

  function handleBurgerOpen() {
    document
      .querySelector(".burger__cover")
      .classList.add("burger__cover_active");
  }

  return location.pathname === "/" && !loggedIn ? (
    <nav className="navigation">
      <ul className="navigation__links">
        <li>
          <Link
            to="/signup"
            className="navigation__link navigation__link_type_signup"
          >
            Регистрация
          </Link>
        </li>
        <li>
          <Link
            to="/signin"
            className="navigation__link navigation__link_type_signin"
          >
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  ) : (
    <nav className="navigation__movies">
      <ul className="navigation__links navigation__movies-links">
        <li>
          <Link
            to="/movies"
            className={
              location.pathname === "/"
                ? "navigation__link navigation__all-movies-link navigation__all-movies-link_logged-in"
                : "navigation__link navigation__all-movies-link"
            }
          >
            Фильмы
          </Link>
        </li>
        <li>
          <Link
            to="/saved-movies"
            className={
              location.pathname === "/"
                ? "navigation__link navigation__saved-movies-link navigation__saved-movies-link_logged-in"
                : "navigation__link navigation__saved-movies-link"
            }
          >
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
      <button
        className={
          location.pathname === "/"
            ? "navigation__button_type_account navigation__button_type_account_logged-in"
            : "navigation__button_type_account"
        }
        onClick={handleAccount}
        type="button"
      >
        Аккаунт
        <img className="navigation__acc-icon" src={icon} alt="иконка акаунта" />
      </button>
      <button
        className="navigation__button_type_burger"
        onClick={handleBurgerOpen}
        type="button"
      >
        <hr className="navigation__button-line"></hr>
      </button>
      <Burger />
    </nav>
  );
}

export default Navigation;
