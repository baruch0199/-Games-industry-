const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const mongooseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 100,
  },
  admin: {
    type: Boolean,
  },
});

// authentication
mongooseSchema.methods.generateToken = function generateToken() {
  return jwt.sign(
    { id: this._id, admin: this.admin, name: this.name, email: this.email },
    "stamp"
  );
};

const User = mongoose.model("User", mongooseSchema, "users");

module.exports = User;
