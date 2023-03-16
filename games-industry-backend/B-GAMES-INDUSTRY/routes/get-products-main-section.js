const express = require("express");
const router = express.Router();

const { MainPageProduct } = require("../models/main-page-products-validation");

router.get("/", async (req, res) => {
  const mainPageProduct = await MainPageProduct.find({});
  res.send(mainPageProduct);
});

module.exports = router;
