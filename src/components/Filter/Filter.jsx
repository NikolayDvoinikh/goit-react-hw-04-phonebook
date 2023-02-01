import PropTypes from 'prop-types';

import css from './filter.module.css';

const Filter = ({ filter, handleChange }) => {
  return (
    <label htmlFor="filter" className={css.label}>
      Find contacts by name
      <input
        className={css.filter}
        type="text"
        name="filter"
        value={filter}
        onChange={handleChange}
      />
    </label>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
