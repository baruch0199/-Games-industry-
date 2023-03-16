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
  platforms: {
    type: String,
    required: true,
  },
  published_date: {
    type: String,
    required: true,
  },

  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const MainPageProduct = mongoose.model(
  "mainPageProduct",
  productSchema,
  "mainPageProducts"
);

//user inputs validation
function validateProductJoi(MainPageProduct) {
  const userInputSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    worth: joi.string().required(),
    image: joi.string().required(),
    platforms: joi.string().required(),
    published_date: joi.string().required(),
  });
  return userInputSchema.validate(MainPageProduct);
}

module.exports = { validateProductJoi, MainPageProduct };
