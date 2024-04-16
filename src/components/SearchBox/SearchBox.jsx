import css from "./SearchBox.module.css";

const SearchBox = ({handleFilterChange}) => {
  const onChange = (e) => {
    const text = e.target.value.trim();
    handleFilterChange(text);
  };
  return (
    <label className={css.label}>
      Find contacts by name
      <input className={css.input} type="text" onChange={onChange} />
    </label>
  );
};

export default SearchBox;
