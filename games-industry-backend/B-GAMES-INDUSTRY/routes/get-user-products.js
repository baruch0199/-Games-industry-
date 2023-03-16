const express = require("express");
const router = express.Router();
const usersAuthorization = require("../middleware/authorization");
const { Product } = require("../models/product-validation");

router.get("/", usersAuthorization, async (req, res) => {

  const allProducts = await Product.find({ user_id: req.user.id });
  res.send(allProducts);
});

module.exports = router;
