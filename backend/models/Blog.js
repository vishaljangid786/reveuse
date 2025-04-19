const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },

  comments: [commentSchema],
});

module.exports = mongoose.model("Blog", blogSchema);
