const Blog = require("../models/Blog");
const jwt = require("jsonwebtoken");

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

exports.getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
};

exports.createBlog = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // use your actual secret
    const userId = decoded.id;

    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      createdBy: userId, // 🔥 This connects the blog to the user
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(400).json({ error: "Failed to create blog." });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, content, imageUrl: oldImageUrl } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : oldImageUrl;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, imageUrl },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
};
exports.likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    blog.likes += 1;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Error liking blog" });
  }
};
exports.unlikeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    blog.likes -= 1;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Error liking blog" });
  }
};
exports.addComment = async (req, res) => {
  const { text } = req.body;

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  const userId = req.user.id; // Access the user ID from req.user

  try {
    const blog = await Blog.findById(req.params.id);

    // Add the comment to the blog with the createdBy field
    blog.comments.push({
      text,
      imageUrl,
      createdAt: new Date(),
      createdBy: userId, // Attach the user ID who is creating the comment
    });

    await blog.save();
    res.status(200).json(blog); // Send back the updated blog
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding comment" });
  }
};
exports.addviews = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.views += 1; // Increment view count
    await blog.save();

    res.status(200).json(blog); // Send the updated blog data back to the client
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
