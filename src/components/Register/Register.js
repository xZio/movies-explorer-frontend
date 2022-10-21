import Form from "../Form/Form";
import "./Register.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Register({ handleRegister }) {
  const { values, handleChange, isValid, resetForm, setIsValid } =
    useFormAndValidation();

  return (
    <Form
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      isRegisterText="Уже зарегистрированы?"
      linkText="Войти"
      link="/signin"
      handleRegister={handleRegister}
      values={values}
    >
      <div className="register__input-container">
        <span className="register__input-title"> Имя</span>
        <input
          value={values.name}
          type="text"
          className="register__input"
          name="name"
          onChange={handleChange}
          required
        ></input>
        <span className="register__input-error">error example</span>
      </div>
      <div className="register__input-container">
        <span className="register__input-title">E-mail</span>
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
      <div className="register__input-container">
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

export default Register;
