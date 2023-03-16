const express = require("express");
const router = express.Router();
const User = require("../models/user-validation-mongoos");
const bcrypt = require("bcrypt");
const validateUser = require("../models/user-validation-joi");

router.post("/registration", (req, res) => {
  if (!req.body.admin) {
    req.body.admin = false;
  }

  //joi validation
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //mongoose validation
  const createUser = async () => {
    const { password, email } = req.body;

    //check user existent
    const isUserExist = await User.findOne({ email: email });

    if (isUserExist) {
      res.status(400).send("user exist");
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    try {
      const user = await new User(req.body).save();
      if (user) {
        const { name, email } = user;

        res
          .status(200)
          .send(`your ditails are:\n name: ${name}\n email: ${email}`);
      }
    } catch (err) {
      const { errors } = err;
      console.log(errors);

      for (let key in errors) {
        res.status(400).send(errors[key].message.replace("Path", "Your"));
      }
      return;
    }
  };
  createUser();
});

module.exports = router;
