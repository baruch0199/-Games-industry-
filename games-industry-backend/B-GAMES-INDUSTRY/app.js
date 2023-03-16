const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const signUp = require("./routes/sign-up");
const signIn = require("./routes/sign-in");
const deleteUser = require("./routes/delete-user");
const createProduct = require("./routes/create-product");
const getUserProducts = require("./routes/get-user-products");
const buyProducts = require("./routes/buy-products");
const deleteOneUserProducts = require("./routes/delete-one-user-products");
const deleteOneMainSection = require("./routes/delete-one-main-section");
const createProductsMainSection = require("./routes/create-products-main-section");
const getProductsMainSection = require("./routes/get-products-main-section");
const editProduct = require("./routes/edit-product");
require("dotenv").config();

const cors = require("cors");

const connectMongoose = async () => {
  try {
    const connect = mongoose.connect(
      "mongodb://localhost:/games"
    );
    const response = await connect;
    if (response) {
      console.log("mongoose is connected");
    }
  } catch (err) {
    console.log("error ->", err);
  }
};
connectMongoose();

app.use(cors());
app.use(morgan("dev"), express.json());
app.use("/sign-up", signUp);
app.use("/sign-in", signIn);
app.use("/delete-user", deleteUser);
app.use("/create-product", createProduct);
app.use("/get-user-products", getUserProducts);
app.use("/buy-products", buyProducts);
app.use("/delete-one-user-products", deleteOneUserProducts);
app.use("/delete-one-main-section", deleteOneMainSection);
app.use("/create-products-main-section", createProductsMainSection);
app.use("/get-products-main-section", getProductsMainSection);
app.use("/edit-product", editProduct);

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`listening to a port ${port}`));
