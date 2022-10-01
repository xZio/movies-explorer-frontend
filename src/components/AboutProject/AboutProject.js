import "./AboutProject.css";
import "../Title/Title.css";

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="title">О проекте</h2>
      <div className="about-project__content">
        <div>
          <h3 className="about-project__content__title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__content__description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>

        <div>
          <h3 className="about-project__content__title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__content__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__time-lines">
        <div className="about-project__time-lines__backend">
          <p className="about-project__time-lines__backend__duration">
            1 неделя
          </p>
          <p className="about-project__time-lines__backend__title">Back-end</p>
        </div>
        <div className="about-project__time-lines__frontend">
          <p className="about-project__time-lines__frontend__duration">
            4 недели
          </p>
          <p className="about-project__time-lines__frontend__title">
            Front-end
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
