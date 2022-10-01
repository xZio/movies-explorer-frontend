import { Link, useNavigate } from "react-router-dom";
import "./Burger.css";
import icon from "../../images/account_icon.svg";

function Burger() {
  const navigate = useNavigate();

  function handleBurgerEsc(e) {
    e.preventDefault();
    console.log(document.querySelector(".burger__cover"));
    document
      .querySelector(".burger__cover")
      .classList.remove("burger__cover_active");
  }

  function handleAccountOpen(e) {
    e.preventDefault();
    navigate("/profile");
  }

  return (
    <div className="burger__cover">
      <div className="burger">
        <Link to="/" className="burger__link">
          Главная
        </Link>
        <Link to="/movies" className="burger__link">
          Фильмы
        </Link>
        <Link to="/saved-movies" className="burger__link">
          Сохранённые фильмы
        </Link>
        <button
          className="burger__button_type_account"
          onClick={handleAccountOpen}
        >
          Аккаунт
          <img
            className="navigation__acc-icon"
            src={icon}
            alt="иконка акаунта"
          />
        </button>
      </div>
      <button onClick={handleBurgerEsc} className="burger__esc-button">
        <hr className="burger__esc-button-line"></hr>
        <hr className="burger__esc-button-line"></hr>
      </button>
    </div>
  );
}

export default Burger;
