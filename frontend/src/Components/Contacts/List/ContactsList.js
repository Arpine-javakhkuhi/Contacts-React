import ContactsItem from "./ContactsItem";

function ContactsList(props) {
  return (
    <ol>
      {props.contacts.map((contact) => {
        return (
          <ContactsItem
            contact={contact}
            key={contact.id}
            findContactById={props.findContactById}
            onDelete={props.onDelete}
          />
        );
      })}
    </ol>
  );
}

export default ContactsList;
