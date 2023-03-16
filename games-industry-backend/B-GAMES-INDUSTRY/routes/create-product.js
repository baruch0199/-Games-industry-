const express = require("express");
const router = express.Router();
const usersAuthorization = require("../middleware/authorization");
let { validateProductJoi, Product } = require("../models/product-validation");

router.post("/", usersAuthorization, async (req, res) => {

  //validate user
  const { error } = validateProductJoi(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //validate system
  const user = req.body;
  user.user_id = req.user.id;
  const product = await new Product(user).save();
  res.status(201).send(product);
});

module.exports = router;
