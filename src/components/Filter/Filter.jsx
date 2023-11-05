import PropTypes from 'prop-types';
import css from './Filter.module.css';
import React  from 'react';

const Filter = ({value, onChange}) => {

    return (
      <div className={css.filter}>
        <label>
          Filter:
          <input
            className={css.filterInput}
            type="name"
            value={value}
            onChange={onChange}
          />
        </label>
      </div>
    );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;