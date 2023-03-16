import css from './ContactList.module.css';

import PropTypes from 'prop-types';
export const ContactList = ({ contactNames, onDelete }) => {
  return (
    <ul className={css.list}>
      {contactNames.map(({ name, id, number }) => {
        return (
          <li key={id} className={css.contactListItem}>
            <div className={css.contactInfo}>
              <span className={css.contactName}>{name}</span>
              <span className={css.contactNumber}>{number}</span>
            </div>
            <button
              type="button"
              onClick={onDelete}
              id={id}
              className={css.deleteButton}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
ContactList.proptype = {
  contactNames: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
