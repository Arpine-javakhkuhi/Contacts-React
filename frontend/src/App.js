import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import ContactsForm from "./components/Contacts/Form/ContactsForm";
import ContactsList from "./components/Contacts/List/ContactsList";
import Loader from "./components/Helper/Loader";

function App() {
  let [contacts, setContacts] = useState(null);
  const [contact, setContact] = useState({});
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const baseUrl = "http://localhost:5050/api/contacts";

  const getAllContacts = () => {
    fetch(baseUrl)
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
  const addContact = (newContact) => {
    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        if (resp && resp.error) {
          setError(resp.error);
        } else {
          setContacts([
            ...contacts,
            {
              name: resp.name,
              phone: resp.phone,
              id: resp.id,
            },
          ]);
          setError(false);
          setContact({});
          setEdit(false);
        }
      });
  };

  const findContact = (id) => {
    setContact(contacts.find((contact) => contact.id === id));
    setEdit(true);
  };

  /* Edit contact */
  const editContact = (updatedContact) => {
    fetch(`${baseUrl}/${updatedContact.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedContact),
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
              if (contact.id === updatedContact.id) {
                contact = updatedContact;
              }
              return contact;
            })
          );
          setContact({});
          setEdit(false);
        }
      });
  };

  /* Delete contact */
  const deleteContact = (id) => {
    fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    }).then((resp) => {
      if (resp.error) {
        setError(resp.error);
      } else {
        setContacts(contacts.filter((contact) => contact.id !== id));
      }
    });
  };

  return (
    <div className="wrapper">
      <Header />

      {loading && <Loader />}

      {contacts && contacts.length ? (
        <ContactsList
          contacts={contacts}
          findContactById={findContact}
          onDelete={deleteContact}
        />
      ) : loading ? null : (
        <p>No contacts</p>
      )}

      {!loading ? (
        <ContactsForm
          formTitle={edit ? "Edit contact" : "Add contact"}
          contact={contact}
          edit={edit}
          onSubmit={addContact}
          onEdit={editContact}
        />
      ) : null}

      {error ? <p className="error">{error}</p> : null}
    </div>
  );
}

export default App;
