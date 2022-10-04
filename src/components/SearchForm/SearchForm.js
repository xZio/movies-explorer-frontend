import "./SearchForm.css";
import searchIcon from "../../images/search-icon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="searchform" noValidate>
      <form className="searchform__form">
        <div className="searchform__container">
          <img
            className="searchform__icon"
            src={searchIcon}
            alt="иконка поиска"
          />
          <input
            type="search"
            required
            placeholder="Фильм"
            className="searchform__input"
          ></input>
          <button type="submit" className="searchform__button" />
        </div>

        <hr className="searchform__separator"></hr>
        <FilterCheckbox checkboxText="Короткометражки"></FilterCheckbox>
      </form>
    </section>
  );
}

export default SearchForm;
