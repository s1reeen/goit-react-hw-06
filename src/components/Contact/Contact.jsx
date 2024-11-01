import css from "./Contact.module.css";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();

  const onDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <li className={css.contactItem}>
      <div className={css.contactElement}>
        <p className={css.info}>
          <FaUser className={css.contactIcon} />
          {name}
        </p>
        <p className={css.info}>
          <FaPhone className={css.phoneIcon} />
          {number}
        </p>
      </div>
      <button className={css.deleteBtn} onClick={() => onDeleteContact(id)}>
        Delete
      </button>
    </li>
  );
};

export default Contact;
