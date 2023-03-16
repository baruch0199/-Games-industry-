const joi = require("joi");
const mongoose = require("mongoose");
const lodash = require("lodash");

// system validation
const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  worth: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Product = mongoose.model("product", productSchema, "products");

//user inputs validation
function validateProductJoi(product) {
  const userInputSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    worth: joi.string().required(),
    image: joi.string().required(),
  });
  return userInputSchema.validate(product);
}

module.exports = { validateProductJoi, Product };
