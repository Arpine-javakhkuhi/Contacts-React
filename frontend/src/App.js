import React, { useEffect, useState } from "react";
import ContactsForm from "./Components/Contacts/Form/ContactsForm";
import ContactsList from "./Components/Contacts/List/ContactsList";
import Loader from "./Components/Helper/Loader";

function App() {
  let [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({});
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const requestUrl = "http://localhost:5050/api/contacts";

  const getAllContacts = () => {
    fetch(requestUrl)
      .then((resp) => {
        return resp.json();
      })
      .then((contacts) => {
        setLoading(false);
        setContacts(contacts);
      });
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  /* Add contact */
  function addContact(newContact) {
    fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newContact.name,
        phone: newContact.phone,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        if (resp && resp.error) {
          setError(resp.error);
        } else {
          setContacts(
            contacts.concat([
              {
                name: resp.name,
                phone: resp.phone,
                id: resp.id,
              },
            ])
          );
          setError(false);
          setContact({});
          setEdit(false);
        }
      });
  }

  function findContact(id) {
    const contact = contacts.find((contact) => contact.id === id);
    setContact(contact);
    setEdit(true);
  }

  /* Edit contact */
  function editContact(updatedContact) {
    fetch(`${requestUrl}/${updatedContact.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: updatedContact.name,
        phone: updatedContact.phone,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        if (resp && resp.error) {
          setError(resp.error);
        } else {
          setError(false);
          setContacts(
            contacts.map((contact) => {
              if (contact.id === resp.id) {
                contact = resp;
              }
              return contact;
            })
          );
          setContact({});
          setEdit(false);
        }
      });
  }

  /* Delete contact */
  function deleteContact(id) {
    fetch(`${requestUrl}/${id}`, {
      method: "DELETE",
    }).then((resp) => {
      if (resp.error) {
        setError(resp.error);
      } else if (resp.status < 400) {
        contacts = contacts.filter((contact) => contact.id !== id);
        setContacts(contacts);
      }
    });
  }

  return (
    <div className="wrapper">
      <h1>Contacts</h1>

      {loading && <Loader />}

      {contacts.length ? (
        <ContactsList
          contacts={contacts}
          findContactById={findContact}
          onDelete={deleteContact}
        />
      ) : loading ? null : (
        <p>No contacts</p>
      )}

      <ContactsForm
        contact={contact}
        edit={edit}
        onSubmit={addContact}
        onEdit={editContact}
      />

      {error ? <p className="error">{error}</p> : null}
    </div>
  );
}

export default App;
