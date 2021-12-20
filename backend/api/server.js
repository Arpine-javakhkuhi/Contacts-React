const express = require("express");
const router = express.Router();
const contacts = require("../contacts/allContacts").contacts;

const validation = (req, res, next) => {
  const nameRegex = /^[-a-zA-Z()]+(\s?[-a-zA-Z()]+)*$/.test(req.body.name);
  const phoneRegex = /^(\+374|[0]{1}){1}?([1-9]{2})(\d{6})$/.test(
    req.body.phone
  );

  if (nameRegex && phoneRegex) {
    return next();
  }

  return res.status(400).json({
    error: "Validation failed. Please, enter a valid phone and name",
  });
};

const addContact = (req, res, next) => {
  const id = `${Date.now()}_${Math.random()}`;
  const newContact = {
    id,
    name: req.body.name,
    phone: req.body.phone,
  };

  contacts.push(newContact);
  req.contact = newContact;
  return next();
};

const updateContact = (req, res, next) => {
  if (req.contact) {
    const updatedContact = {
      id: req.params.id,
      name: req.body.name,
      phone: req.body.phone,
    };
    contacts.splice(req.targetIndex, 1, updatedContact);
    res.status(201).json(updatedContact);
    return;
  } else {
    return res.status(400).json({
      error: {
        message: "The contact doesn't exist",
      },
    });
  }
};

const findContact = (req, res, next) => {
  const contact = contacts.find((elem, ind) => {
    if (elem.id == req.params.id) {
      req.targetIndex = ind;
      return elem;
    }
  });
  req.contact = contact;
  return next();
};

router.get("/", (req, res) => {
  res.json(contacts);
});

router.post("/", validation, addContact, (req, res) => {
  res.status(201).json(req.contact);
});

router.get("/:id", (req, res) => {
  const contact = contacts.find((elem) => elem.id === req.params.id);
  if (contact) {
    res.status(200).json(contact);
    return;
  } else {
    return res.status(400).json({
      error: {
        message: "The contact doesn't exist",
      },
    });
  }
});

router.put("/:id", findContact, validation, updateContact);

router.delete("/:id", findContact, (req, res) => {
  if (req.contact) {
    contacts.splice(req.targetIndex, 1);
    res.sendStatus(204);
  } else {
    return res.status(400).json({
      error: {
        message: "The contact doesn't exist",
      },
    });
  }
});

exports.router = router;
