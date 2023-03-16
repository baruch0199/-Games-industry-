const express = require("express");
const router = express.Router();
const usersAuthorization = require("../middleware/authorization");
let {
  validateProductJoi,
  MainPageProduct,
} = require("../models/main-page-products-validation");

router.post("/", usersAuthorization, async (req, res) => {
  //validate user
  // const { error } = validateProductJoi(req.body);
  // if (error) {
  //   return res.status(400).send(error.details[0].message);
  // }

  //validate system
  const mainPageProduct = await new MainPageProduct(req.body).save();
  res.status(201).send(mainPageProduct);
});

module.exports = router;
