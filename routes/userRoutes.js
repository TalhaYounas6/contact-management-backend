const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  currentUserInfo,
} = require("../controllers/userControllers");
const validateTokenHandler = require("../middleware/validateTokenHandler");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current").get(validateTokenHandler, currentUserInfo);

module.exports = router;
