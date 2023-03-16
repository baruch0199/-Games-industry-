const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {


  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401).send("access deniend");
    return;
  }

  const payload = jwt.verify(token, "stamp");

  req.user = payload;

  if (!payload) {
    res.status(400).send("invalid token");
    return;
  }

  next();
};

module.exports = authorization;
