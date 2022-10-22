import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import Header from "../Header/Header";
import "./Profile.css";

function Profile({ handleUpdateUser, handleLogout }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    let { name, email } = values;

    if (!email || !name) {
      return;
    }

    handleUpdateUser(name, email);
  }

  return (
    <>
      <Header />
      <main>
        <section className="pofile">
          <h2 className="profile__header"> Привет, Виталий!</h2>
          <form className="profile__form" onSubmit={handleSubmit}>
            <div className="profile__input-conteiner">
              <span className="profile__input-name">Имя</span>
              <input
                onChange={handleChange}
                className="profile__input"
                type="text"
                name="name"
                value={values.name}
              ></input>
            </div>
            <span className="profile__input-error">{errors.name}</span>
            <div className="profile__input-conteiner">
              <span className="profile__input-name">E-mail</span>
              <input
                onChange={handleChange}
                className="profile__input"
                type="email"
                name="email"
                value={values.email}
              ></input>
            </div>
            <span className="profile__input-error">{errors.email}</span>
            <button
              className={
                isValid
                  ? "profile__submit-button"
                  : "profile__submit-button profile__submit-button_disabled"
              }
              type="submit"
            >
              Редактировать
            </button>
          </form>
          <button
            type="button"
            className="profile__logout-button"
            onClick={handleLogout}
          >
            Выйти из аккаунта
          </button>
        </section>
      </main>
    </>
  );
}

export default Profile;
