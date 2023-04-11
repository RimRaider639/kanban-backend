const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticate(req, res, next) {
  const { token } = req.headers;
  try {
    if (token) {
      const found = jwt.verify(token, process.env.KEY);
      req.body.userID = found.id;
      next();
    } else {
      res.status(401);
      res.send({ message: "Token not found in headers. Please login." });
    }
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

module.exports = authenticate;
