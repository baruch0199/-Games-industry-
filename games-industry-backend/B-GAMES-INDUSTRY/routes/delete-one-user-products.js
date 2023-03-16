const express = require("express");
const router = express.Router();
const usersAuthorization = require("../middleware/authorization");
const { Product } = require("../models/product-validation");

router.delete("/:id", usersAuthorization, async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(401).send("requested denied");
    }
    await Product.deleteOne({ _id: req.params.id });
  } catch (error) {
    console.log("new error", error);
  }

  return res.send("product deleted");
});

module.exports = router;
