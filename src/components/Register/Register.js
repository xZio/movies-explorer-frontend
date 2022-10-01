import Form from "../Form/Form";
import "./Register.css";

function Register() {
  return (
    <Form
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      isRegisterText="Уже зарегистрированы?"
      linkText="Войти"
      link="/signin"
    >
      <div className="register__input-container">
        <span className="register__input-title"> Имя</span>
        <input type="text" className="register__input" required></input>
        <span className="register__input-error">error example</span>
      </div>
      <div className="register__input-container">
        <span className="register__input-title">E-mail</span>
        <input type="email" className="register__input" required></input>
        <span className="register__input-error">error example</span>
      </div>
      <div className="register__input-container">
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

export default Register;
