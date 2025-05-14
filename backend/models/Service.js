const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  details: [
    {
      head: String, // Heading of each detail
      description: String, // Description of the detail
    },
  ],
});

module.exports = mongoose.model("Service", serviceSchema);
