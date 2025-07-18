const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.NOT_FOUND:
      res.json({ title: "Not found", message: err.message, stack: err.stack });
      break;

    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation failed",
        message: err.message,
        stack: err.stack,
      });
      break;

    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden error",
        message: err.message,
        stack: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stack: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stack: err.stack,
      });
      break;

    default:
      console.log("No errors, All good");
      break;
  }
};

module.exports = errorHandler;
