import ContactsItem from "./ContactsItem";
import PropTypes from "prop-types";

const ContactsList = ({ contacts, findContactById, onDelete }) => {
  return (
    <ol>
      {contacts.map((contact) => {
        return (
          <ContactsItem
            contact={contact}
            key={contact.id}
            findContactById={findContactById}
            onDelete={onDelete}
          />
        );
      })}
    </ol>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired,
  findContactById: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactsList;
