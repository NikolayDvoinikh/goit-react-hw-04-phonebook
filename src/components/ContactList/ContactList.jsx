import css from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ list, deleteContact }) => {
  return (
    <ul className={css.listContacts}>
      {list.map(({ id, name, number }) => (
        <li key={id} className={css.item}>
          <span className={css.text}>
            {name}: {number}
          </span>
          <button
            id={id}
            className={css.btnDelete}
            type="button"
            onClick={deleteContact}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

ContactList.defaultProps = {
  list: [],
};

ContactList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
