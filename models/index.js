const mongoose = require("mongoose");
const User = require("./User");

mongoose.model("User", User.schema);

module.exports = {
  User,
};
