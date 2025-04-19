const Blog = require("../models/Blog");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.file ? req.file.path : null, // Cloudinary provides the URL in req.file.path
      createdBy: userId,
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
    const imageUrl = req.file ? req.file.path : oldImageUrl;

    // If there's a new image and an old image exists, delete the old image from Cloudinary
    if (req.file && oldImageUrl) {
      const publicId = oldImageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

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
  try {
    const blog = await Blog.findById(req.params.id);

    // If the blog has an image, delete it from Cloudinary
    if (blog.imageUrl) {
      const publicId = blog.imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Server error" });
  }
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
  const imageUrl = req.file ? req.file.path : null;
  const userId = req.user.id;

  try {
    const blog = await Blog.findById(req.params.id);
    blog.comments.push({
      text,
      imageUrl,
      createdAt: new Date(),
      createdBy: userId,
    });

    await blog.save();
    res.json(blog);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Server error" });
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
