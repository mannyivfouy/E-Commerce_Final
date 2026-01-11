const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String, require: true },
  username: { type: String, require: true },
  password: { type: String, require: true },
  dateOfBirth: { type: String, require: true },
  address: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
  role: { type: String, require: true },
  userImage: { type: String, default: 'uploads/users/default.png' },
});

module.exports = mongoose.model("Users", userSchema);
