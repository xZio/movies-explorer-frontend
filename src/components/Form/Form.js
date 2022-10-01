import "./Form.css";
import logo from "../../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";

function Form({ title, children, buttonText, isRegisterText, linkText, link }) {
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate("/movies");
  }
  return (
    <section className="form">
      <div className="form__content">
        <img className="form__logo" src={logo} alt="логотип" />
        <h2 className="form__title">{title}</h2>
        <form className="form__container">{children}</form>
        <button className="form__button" onClick={handleSubmit}>
          {buttonText}
        </button>
        <div className="form__question">
          <p className="form__phrase">{isRegisterText}</p>
          <Link className="form__link" to={link}>
            {linkText}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Form;
