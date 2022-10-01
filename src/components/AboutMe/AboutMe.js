import "./AboutMe.css";
import "../Title/Title.css";
import photo from "../../images/photo.png";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="title">Студент</h2>
      <div className="about-me__content">
        <div>
          <h3 className="about-me__title">Виталий</h3>
          <p className="about-me__about">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб&#8209;разработке, начал
            заниматься фриланс&#8209;заказами и ушёл с постоянной работы.
          </p>
          <a
            href="https://github.com/xZio"
            className="about-me__link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={photo} alt="фото" className="about-me__photo"></img>
      </div>
    </section>
  );
}

export default AboutMe;
