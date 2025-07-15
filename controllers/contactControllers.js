const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
// @desc Get all contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc Get one contact
// @route GET /api/contacts/id
// @access private
const getOneContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.status(200).json(contact);
});

// @desc Create a contact
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Enter All Fields");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
  });

  res.status(200).json(contact);
});

// @desc Update a contacts
// @route PUT /api/contacts/id
// @access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact does not exist");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User is not allowed to update this contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

// @desc Delete a contact
// @route DELETE /api/contacts
// @access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact does not exist");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User is not allowed to delete this contact");
  }

  await contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  getOneContact,
  updateContact,
  createContact,
  deleteContact,
};
