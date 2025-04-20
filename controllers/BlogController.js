const Blog = require("../models/Blog");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary"); // Adjust the path as needed
const fs = require("fs");

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

    let imageUrl = null;

    // Upload image to Cloudinary if present
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogs",
      });

      imageUrl = uploadResult.secure_url;

      // Optional: Delete local file after uploading to Cloudinary
      fs.unlinkSync(req.file.path);
    }

    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      imageUrl,
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
    let imageUrl = oldImageUrl;

    if (req.file) {
      // Upload new image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogs",
      });
      imageUrl = uploadResult.secure_url;

      // Delete local file after uploading
      fs.unlinkSync(req.file.path);

      // Delete old image from Cloudinary if exists
      if (oldImageUrl && oldImageUrl.includes("res.cloudinary.com")) {
        const publicId = oldImageUrl
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0]; // Extract folder/filename

        await cloudinary.uploader.destroy(publicId);
      }
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

  try {
    let cloudinaryImageUrl = null;

    // If an image is uploaded, upload it to Cloudinary
    if (imageUrl) {
      const uploadResponse = await cloudinary.uploader.upload(imageUrl, {
        folder: "comments_images", // Optional: You can specify a folder for the images
      });
      cloudinaryImageUrl = uploadResponse.secure_url; // Get the Cloudinary URL of the image
    }

    const blog = await Blog.findById(req.params.id);

    // Add comment with or without image
    blog.comments.push({
      text,
      imageUrl: cloudinaryImageUrl, // Use the Cloudinary image URL
      createdAt: new Date(),
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
