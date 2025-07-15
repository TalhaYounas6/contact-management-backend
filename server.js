const express = require("express");
const app = express();
const dot = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const dbConnection = require("./config/dbConnection");

dbConnection();
app.use(errorHandler);
app.use(express.json());
// app.use(errorHandler);
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.listen(process.env.PORT || 5001, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});
