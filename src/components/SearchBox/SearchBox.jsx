import { useDispatch, useSelector } from "react-redux";
import css from "./SearchBox.module.css";
import { useId } from "react";
import { setFilters } from "../../redux/filtersSlice";

const SearchBox = () => {
  const filters = useSelector((state) => state.filters.filters);
  const dispatch = useDispatch();

  const searchFieldId = useId();

  return (
    <div className={css.searchBox}>
      <label className={css.searchLabel} htmlFor={searchFieldId}>
        Find contacts by name
      </label>
      <input
        className={css.searchInput}
        type="text"
        name="search"
        value={filters}
        onChange={(event) => {
          dispatch(setFilters(event.target.value));
        }}
        id={searchFieldId}
      />
    </div>
  );
};

export default SearchBox;
