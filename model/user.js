const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // You’ll probably hash this
  name: String,
  // any other fields you need
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
