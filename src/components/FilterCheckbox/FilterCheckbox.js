import "./FilterCheckbox.css";

function FilterCheckbox({ checkboxText }) {
  return (
    <label className="filter-checkbox">
      <input type="checkbox" className="filter-checkbox__input" />
      <span className="filter-checkbox__fake"></span>
      <span className="filter-checkbox__text">{checkboxText}</span>
    </label>
  );
}

export default FilterCheckbox;
