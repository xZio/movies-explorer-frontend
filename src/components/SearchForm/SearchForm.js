import "./SearchForm.css";
import searchIcon from "../../images/search-icon.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function SearchForm({ searchResult, onCheck, isShort }) {
  const { values, handleChange, isValid, resetForm, setIsValid } =
    useFormAndValidation();

  const location = useLocation();
  useEffect(() => {
    setIsValid(false);
  }, [setIsValid]);

  useEffect(() => {
    if (location.pathname === "/movies" && localStorage.getItem("searchText")) {
      values.search = localStorage.getItem("searchText");
      setIsValid(true);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    searchResult(values.search, isShort);
    resetForm();
  }

  return (
    <section className="searchform">
      <form className="searchform__form" noValidate onSubmit={handleSubmit}>
        <div className="searchform__container">
          <img
            className="searchform__icon"
            src={searchIcon}
            alt="иконка поиска"
          />
          <input
            type="search"
            name="search"
            required
            placeholder="Фильм"
            className="searchform__input"
            onChange={handleChange}
            value={values.search || ""}
          ></input>
          <button
            type="submit"
            className={
              isValid
                ? "searchform__button"
                : "searchform__button searchform__button_disabled"
            }
            disabled={!isValid}
          />
        </div>

        <hr className="searchform__separator"></hr>
        <FilterCheckbox
          checkboxText="Короткометражки"
          checked={isShort}
          onCheck={onCheck}
        ></FilterCheckbox>
      </form>
    </section>
  );
}

export default SearchForm;
