const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, require: true },
  description: { type: String, require: true },
  status: { type: Boolean, require: true },
  createDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Categories", categorySchema);
