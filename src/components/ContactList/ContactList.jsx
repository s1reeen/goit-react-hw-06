import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

const ContactList = () => {
  const contacts = useSelector((state) => state.contactsData.items);
  const filters = useSelector((state) => state.filters.filters);

  const visibleContacts = contacts.filter(
    (contact) =>
      contact.name
        .toLowerCase()
        .trim()
        .includes(filters.toLowerCase().trim()) ||
      contact.number.toLowerCase().includes(filters.toLowerCase().trim())
  );

  return (
    <div>
      <ul className={css.contactList}>
        {visibleContacts.map((contact) => (
          <Contact
            id={contact.id}
            key={contact.id}
            name={contact.name}
            number={contact.number}
          />
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
