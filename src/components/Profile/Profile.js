import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    navigate("/");
  }
  return (
    <>
      <Header />
      <main>
        <section className="pofile">
          <h2 className="profile__header"> Привет, Виталий!</h2>
          <form className="profile__form">
            <div className="profile__input-conteiner">
              <span className="profile__input-name">Имя</span>
              <input className="profile__input" type="text"></input>
            </div>
            <span className="profile__input-error">Error example</span>
            <div className="profile__input-conteiner">
              <span className="profile__input-name">E-mail</span>
              <input className="profile__input" type="email"></input>
            </div>
            <span className="profile__input-error">Error example</span>
            <button className="profile__submit-button">Редактировать</button>
          </form>
          <button className="profile__logout-button" onClick={handleLogout}>
            Выйти из аккаунта
          </button>
        </section>
      </main>
    </>
  );
}

export default Profile;
