const express = require("express");
const router = express.Router();
const usersAuthorization = require("../middleware/authorization");
const { MainPageProduct } = require("../models/main-page-products-validation");

router.delete("/:id", usersAuthorization, async (req, res, next) => {

  const product = await MainPageProduct.findOne({ _id: req.params.id });

  if (!product) {
    res.status(401).send("requested denied");
  }
  const deletedOne = await MainPageProduct.deleteOne({ _id: req.params.id });

  return deletedOne.deletedCount;
});

module.exports = router;
