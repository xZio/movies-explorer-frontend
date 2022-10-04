import { Link } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <section>
      <div className="not-found-page">
        <h2 className="not-found-page__header">404</h2>
        <p className="not-found-page__description">Страница не найдена</p>
        <Link to="/" className="not-found-page__link">
          Назад
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
