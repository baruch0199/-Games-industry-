const { Router } = require("express");
const express = require("express");
const router = express.Router();
const User = require("../models/user-validation-mongoos");
const authorization = require("../middleware/authorization");

router.delete("/:id", authorization, async (req, res) => {
  const user = User.findOne({ id: req.params.id });
  if (!user) {
    res.status(404).send("id is not found");
    return;
  }

  const deletedUser = await User.deleteOne({ id: req.params.id });
  
});

module.exports = router;
