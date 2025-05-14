import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { backendurl } from "../../App";

const UpdateService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [currentImage, setCurrentImage] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`${backendurl}/api/services/${id}`);
        if (!response.ok) throw new Error("Failed to fetch service");

        const service = await response.json();
        setFormData({
          title: service.title,
          description: service.description,
          image: null,
        });
        setCurrentImage(service.imageUrl);
      } catch (error) {
        setMessage("Error loading service. Please try again.");
        console.error("Error fetching service:", error);
      }
    };

    fetchService();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);

    // Only append image if a new one is selected
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await fetch(`${backendurl}/api/services/${id}`, {
        method: "PUT",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update service");
      }

      setMessage("Service updated successfully!");
      setTimeout(() => {
        navigate("/admin/services");
      }, 1500);
    } catch (error) {
      setMessage(error.message || "Error updating service. Please try again.");
      console.error("Error updating service:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Service</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Image
          </label>
          {currentImage && (
            <img
              src={currentImage}
              alt="Current Service"
              className="mt-2 rounded-lg w-full h-48 object-cover"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Image (Optional)
          </label>
          <label className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-300 transition duration-200">
            Choose New File
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
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
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {loading ? "Updating..." : "Update Service"}
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
};

export default UpdateService;
