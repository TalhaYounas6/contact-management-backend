const express = require("express");
const router = express.Router();
const {
  getContacts,
  getOneContact,
  updateContact,
  createContact,
  deleteContact,
} = require("../controllers/contactControllers");
const validateTokenHandler = require("../middleware/validateTokenHandler");

router.use(validateTokenHandler);
router.route("/").get(getContacts).post(createContact);

router
  .route("/:id")
  .get(getOneContact)
  .delete(deleteContact)
  .put(updateContact);

module.exports = router;
