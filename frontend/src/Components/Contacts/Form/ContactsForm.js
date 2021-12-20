import React, { useState, useEffect } from "react";

function ContactsForm({ contact, edit, onSubmit, onEdit }) {
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    setInputs(contact);
  }, [contact]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!edit) {
      onSubmit(inputs);
    } else {
      onEdit(inputs);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={inputs.name || ""}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Phone number:
        <input
          type="text"
          name="phone"
          placeholder="098764758"
          value={inputs.phone || ""}
          onChange={handleChange}
          required
        />
      </label>
      <input className="submit" type="submit" value="Submit" />
    </form>
  );
}

export default ContactsForm;
