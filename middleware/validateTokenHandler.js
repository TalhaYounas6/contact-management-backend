const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateTokenHandler = asyncHandler(async (req, res, next) => {
  let token;
  const header = req.headers.authorization || req.headers.Authorization;
  if (header && header.startsWith("Bearer")) {
    token = header.split(" ")[1];
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401);
      throw new Error("Token is invalid");
    } else {
      //   console.log(decoded);
      req.user = decoded.user;
      next();
    }

    if (!token) {
      res.status(401);
      throw new Error("Token is missing");
    }
  });
});

module.exports = validateTokenHandler;
