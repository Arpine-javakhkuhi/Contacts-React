import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ContactsForm = ({ formTitle, contact, edit, onSubmit, onEdit }) => {
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
    <>
      <h3>{formTitle}</h3>
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
    </>
  );
};

ContactsForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  contact: PropTypes.object.isRequired,
  edit: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func,
  onEdit: PropTypes.func,
};

export default ContactsForm;
