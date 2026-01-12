const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true },
  userImage: { type: String, default: "uploads/users/default.png" },
  createDate: { type: Date, dafault: Date.now },
});

module.exports = mongoose.model("Users", userSchema);
