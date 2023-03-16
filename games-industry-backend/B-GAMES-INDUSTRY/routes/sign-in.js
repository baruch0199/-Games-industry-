const express = require("express");
const router = express.Router();
const User = require("../models/user-validation-mongoos");
const validateUser = require("../models/user-validation-joi");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  //joi validation
  const { error } = validateUser(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // mongoose validation
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("user is not exist");
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password // after creation in db
  );

  if (!isPasswordValid) {
    return res.status(400).send("password is not correct");
  }

  // token
  const token = user.generateToken();
  return res.status(200).send({ token });
});

module.exports = router;
