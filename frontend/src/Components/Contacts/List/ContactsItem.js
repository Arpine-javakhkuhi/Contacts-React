function ContactsItem({ contact, findContactById, onDelete }) {
  return (
    <li>
      {contact.name} {contact.phone}
      <button onClick={() => findContactById(contact.id)}>Edit contact</button>
      <button onClick={() => onDelete(contact.id)}>Delete contact</button>
    </li>
  );
}

export default ContactsItem;
