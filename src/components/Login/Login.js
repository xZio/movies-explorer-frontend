import Form from "../Form/Form";
import "./Login.css";

function Login() {
  return (
    <Form
      title="Рады видеть!"
      buttonText="Войти"
      isRegisterText="Ещё не зарегистрированы?"
      linkText="Регистрация"
      link="/signup"
    >
      <div className="register__input-container">
        <span className="register__input-title"> E-mail</span>
        <input type="email" className="register__input" required></input>
        <span className="register__input-error">error example</span>
      </div>
      <div className="register__input-container login__input-container">
        <span className="register__input-title">Пароль</span>
        <input
          required
          type="password"
          className="register__input"
          autoComplete="off"
        ></input>
        <span className="register__input-error">Что-то пошло не так...</span>
      </div>
    </Form>
  );
}

export default Login;
