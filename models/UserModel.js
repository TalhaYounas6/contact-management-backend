const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter all details"],
    },
    email: {
      type: String,
      required: [true, "Please enter all details"],
      unique: [true, "Email already taken"],
    },

    password: {
      type: String,
      required: [true, "Please enter all details"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
