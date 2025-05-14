import React, { useState } from "react";
import axios from "axios";
import Heading from "../../components/Heading";
import { backendurl } from "../../App";

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const isLoggedIn = () => localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      handleImage(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImage = (file) => {
    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImage(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = isLoggedIn();
    if (!token) {
      setMessage("You must be logged in to create a blog.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    if (formData.image) {
      data.append("image", formData.image);
    } else {
      setMessage("Please upload an image.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${backendurl}/api/blogs`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.status === 201) {
        setMessage("Blog created successfully!");
        setFormData({ title: "", content: "", image: null });
        setPreview(null);
      }
    } catch (err) {
      setMessage(
        err.response?.data?.error || "Failed to create blog. Please try again."
      );
      console.error("Error creating blog:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        <Heading text1="Create" text2="Blog" />
      </h2>

      <form
        onSubmit={handleSubmit}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter blog title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            name="content"
            placeholder="Write your blog content here"
            value={formData.content}
            onChange={handleChange}
            required
            rows="6"
            className="mt-1 w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <div
            className={`w-full p-6 border-2 border-dashed rounded-lg text-center transition ${
              dragActive ? "border-blue-600 bg-blue-50" : "border-gray-400"
            }`}>
            <p className="mb-2 text-gray-500">
              Drag & drop an image here, or{" "}
              <span className="text-blue-600 underline">browse</span>
            </p>
            <label className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-300 transition duration-200">
              Choose File
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 rounded-lg w-full h-48 object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
};

export default BlogForm;
