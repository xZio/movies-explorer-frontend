import "./Form.css";
import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Form({
  title,
  children,
  buttonText,
  isRegisterText,
  linkText,
  link,
  handleLogin,
  handleRegister,
  values,
  isValid,
}) {
  const navigation = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    let { name, email, password } = values;
    if (!email || !password) {
      return;
    }

    navigation.pathname === "/signup"
      ? handleRegister(name, email, password)
      : handleLogin(email, password);
  }
  return (
    <section className="form">
      <div className="form__content">
        <Link to="/"><img className="form__logo" src={logo} alt="логотип" /></Link>
        
        <h2 className="form__title">{title}</h2>
        <form className="form__container">{children}</form>
        <button
          className={
            isValid ? "form__button" : "form__button form__button_disabled"
          }
          onClick={handleSubmit}
          type="submit"
          disabled={!isValid}
        >
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
