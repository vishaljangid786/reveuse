const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  price: Number,
});

module.exports = mongoose.model("Service", serviceSchema);
