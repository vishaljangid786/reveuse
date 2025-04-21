const Blog = require("../models/Blog");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../config/cloudinary");

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
      try {
        // Convert buffer to base64
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

        // Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(dataURI, {
          folder: "blogs",
          resource_type: "auto",
        });

        imageUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        throw new Error(`Failed to upload image: ${uploadError.message}`);
      }
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
    res.status(400).json({
      error: "Failed to create blog.",
      details: err.message,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, content, imageUrl: oldImageUrl } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Update title and content
    blog.title = title || blog.title;
    blog.content = content || blog.content;

    // Only update image if a new one is provided
    if (req.file) {
      // Delete old image from Cloudinary if it exists
      if (blog.imageUrl) {
        try {
          const publicId = blog.imageUrl.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error("Error deleting old image:", error);
          // Continue with the update even if old image deletion fails
        }
      }

      // Convert buffer to base64
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "blogs",
        resource_type: "auto",
      });

      blog.imageUrl = result.secure_url;
    }

    await blog.save();
    res.json(blog);
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
      try {
        const publicId = blog.imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error("Error deleting image:", error);
        // Continue with the deletion even if image deletion fails
      }
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

  try {
    let cloudinaryImageUrl = null;

    // If an image is uploaded, upload it to Cloudinary
    if (req.file) {
      // Convert buffer to base64
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

      const uploadResponse = await cloudinary.uploader.upload(dataURI, {
        folder: "comments_images",
        resource_type: "auto",
      });
      cloudinaryImageUrl = uploadResponse.secure_url;
    }

    const blog = await Blog.findById(req.params.id);

    blog.comments.push({
      text,
      imageUrl: cloudinaryImageUrl,
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

    blog.views += 1;
    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
