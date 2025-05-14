import React, { useState } from "react";
import { backendurl } from "../../App";
import Heading from "../../components/Heading";

const NewService = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    details: [
      { head: "", description: "" },
      { head: "", description: "" },
      { head: "", description: "" },
      { head: "", description: "" },
    ],
  });

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...formData.details];
    updatedDetails[index][field] = value;
    setFormData((prev) => ({ ...prev, details: updatedDetails }));
  };

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);

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

    const data = new FormData();
    data.append("title", formData.title);
    data.append("details", JSON.stringify(formData.details));
    data.append("description", formData.description);

    if (formData.image) {
      data.append("image", formData.image);
    } else {
      setMessage("Please upload an image.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${backendurl}/api/services`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create service");
      }

      setMessage("Service created successfully!");
      setFormData({ title: "", description: "", image: null ,details: [
      { head: "", description: "" },
      { head: "", description: "" },
      { head: "", description: "" },
      { head: "", description: "" },
    ],});
      setPreview(null);
    } catch (error) {
      setMessage(error.message || "Error creating service. Please try again.");
      console.error("Error creating service:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        <Heading text1="Create" text2="New Service" />
      </h2>

      <form
        onSubmit={handleSubmit}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className="space-y-6">
        {/* Title Section */}
        <div>
          <label className="block text-xl mulish font-medium text-gray-700 mb-2">
            Service Title
          </label>
          <input
            type="text"
            placeholder="Enter Service Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          />
        </div>

        {/* Description Section */}
        <div>
          <label className="block text-xl mulish font-medium text-gray-700 mb-2">
            Service Description
          </label>
          <textarea
            name="description"
            placeholder="Write a detailed description of the service"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          />
        </div>

        {/* Image Upload Section */}
        <div>
          <label className="block text-xl mulish font-medium text-gray-700 mb-1">
            Service Image
          </label>
          <div
            className={`w-full p-6 border-2 border-dashed rounded-lg text-center transition duration-300 ${
              dragActive ? "border-blue-600 bg-blue-50" : "border-gray-400"
            }`}>
            <p className="mb-2 text-gray-500">
              Drag & drop an image here, or{" "}
              <span className="text-blue-600 underline cursor-pointer">
                browse
              </span>
            </p>
            <label className="inlinetext-xl mulishbg-gray-200 text-gray-800 px-6 py-2 rounded-lg cursor-pointer hover:bg-gray-300 transition duration-200">
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

          {/* Preview Image */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 rounded-lg w-full h-48 object-cover"
            />
          )}
        </div>

        {/* Service Details Section */}
        <div className="space-y-6">
          <label className="block text-xl mulish font-semibold text-gray-800 mb-4">
            Service Details
          </label>
          {formData.details?.map((detail, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder={`Heading ${index + 1}`}
                  value={detail.head}
                  onChange={(e) =>
                    handleDetailChange(index, "head", e.target.value)
                  }
                  className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder={`Description ${index + 1}`}
                  value={detail.description}
                  onChange={(e) =>
                    handleDetailChange(index, "description", e.target.value)
                  }
                  rows="4"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  required
                />
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300">
          {loading ? "Creating..." : "Create Service"}
        </button>
      </form>

      {/* Message */}
      {message && (
        <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
};

export default NewService;
