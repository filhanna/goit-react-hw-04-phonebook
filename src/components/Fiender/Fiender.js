import css from './Fiender.module.css';
import PropTypes from 'prop-types';
export const Fiender = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search contacts by name"
      value={value}
      onChange={onChange}
      className={css.formInput}
    />
  );
};
Fiender.proptype = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
