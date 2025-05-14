import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendurl } from "../../App";
import Heading from "../../components/Heading";
import Loader from "../../components/Loader";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingService, setEditingService] = useState(null);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${backendurl}/api/services`);
      setServices(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;
    try {
      await axios.delete(`${backendurl}/api/services/${id}`);
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert("Failed to delete service.");
    }
  };

  const startEditing = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      image: null,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingService) return;

    // Check if image is too large (max 10MB)
    if (formData.image && formData.image.size > 5 * 1024 * 1024) {
      alert("Image file is too large. Maximum size is 5MB.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      setUpdating(true);
      const res = await axios.put(
        `${backendurl}/api/services/${editingService._id}`,
        data
      );
      setServices((prev) =>
        prev.map((s) => (s._id === res.data._id ? res.data : s))
      );
      setEditingService(null);
    } catch (err) {
      alert("Failed to update service.");
    }finally{
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Heading text1={"All"} text2="Services" />
      {error && <p className="text-center text-red-500">{error}</p>}
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300">
              {service.imageUrl && (
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">
                  {service.description.split(" ").slice(0, 20).join(" ")}
                  {service.description.split(" ").length > 20 ? "..." : ""}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(service)}
                    className="px-4 py-1 bg-yellow-400 rounded-md text-white border-2 border-yellow-400 hover:bg-transparent transition hover:text-yellow-400 text-sm">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-transparent hover:text-red-500 border-2 border-red-500 transition text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingService && (
        <div className="fixed inset-0 bg-[#3535357d] flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md space-y-4 relative">
            <h2 className="text-xl font-bold mb-2">Edit Service</h2>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleEditChange}
              required
              placeholder="Title"
              className="w-full p-2 border border-gray-600 rounded-md"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleEditChange}
              rows={4}
              required
              placeholder="Description"
              className="w-full p-2 border border-gray-600 rounded-md"
            />
            <input
              type="file"
              name="image"
              onChange={handleEditChange}
              accept="image/*"
              className="cursor-pointer"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-4 py-1 bg-gray-300 rounded-md">
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={updating}>
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AllServices;
