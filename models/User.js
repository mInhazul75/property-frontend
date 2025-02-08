const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerify: {
    type: Boolean,
    default: false,
    required: false,
  },
});


const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
