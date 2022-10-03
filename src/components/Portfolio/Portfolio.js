import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            href="https://github.com/xZio/how-to-learn"
            target="_blank"
            rel="noreferrer"
            className="portfolio__link"
          >
            Статичный сайт
          </a>

          <a
            className="portfolio__link"
            href="https://github.com/xZio/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            ↗
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://github.com/xZio/how-to-learn"
            target="_blank"
            rel="noreferrer"
            className="portfolio__link"
          >
            Адаптивный сайт
          </a>
          <a
            className="portfolio__link"
            href="https://github.com/xZio/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            ↗
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://github.com/xZio/how-to-learn"
            target="_blank"
            rel="noreferrer"
            className="portfolio__link"
          >
            Одностраничное приложение
          </a>
          <a
            className="portfolio__link"
            href="https://github.com/xZio/react-mesto-api-full"
            target="_blank"
            rel="noreferrer"
          >
            ↗
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
