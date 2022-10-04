import { Link } from "react-router-dom";
import "./Promo.css";
import logo from "../../images/landing-logo.svg";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__content">
        <h2 className="promo__title">
          Учебный проект студента  факультета Веб&#8209;разработки.
        </h2>
        <p className="promo__description">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <Link to="/" className="promo__link">
          Узнать больше
        </Link>
      </div>
      <img src={logo} alt="Логотип" className="promo__logo" />
    </section>
  );
}

export default Promo;
