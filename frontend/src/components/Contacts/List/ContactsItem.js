import PropTypes from "prop-types";

const ContactsItem = ({ contact, findContactById, onDelete }) => {
  return (
    <li>
      {contact.name} {contact.phone}
      <button onClick={() => findContactById(contact.id)}>Edit contact</button>
      <button onClick={() => onDelete(contact.id)}>Delete contact</button>
    </li>
  );
};

ContactsItem.propTypes = {
  contact: PropTypes.object.isRequired,
  findContactById: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactsItem;
