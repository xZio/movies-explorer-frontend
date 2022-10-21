import Form from "../Form/Form";
import "./Login.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Login({ handleLogin }) {
  const { values, handleChange, isValid, resetForm, setIsValid } =
    useFormAndValidation();

  return (
    <Form
      title="Рады видеть!"
      buttonText="Войти"
      isRegisterText="Ещё не зарегистрированы?"
      linkText="Регистрация"
      link="/signup"
      handleLogin={handleLogin}
      values={values}
    >
      <div className="register__input-container">
        <span className="register__input-title"> E-mail</span>
        <input
          value={values.email || ""}
          type="email"
          className="register__input"
          name="email"
          onChange={handleChange}
          required
        ></input>
        <span className="register__input-error">error example</span>
      </div>
      <div className="register__input-container login__input-container">
        <span className="register__input-title">Пароль</span>
        <input
          value={values.password || ""}
          type="password"
          className="register__input"
          autoComplete="off"
          name="password"
          onChange={handleChange}
          required
        ></input>
        <span className="register__input-error">Что-то пошло не так...</span>
      </div>
    </Form>
  );
}

export default Login;
