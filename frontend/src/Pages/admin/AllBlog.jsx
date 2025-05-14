import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendurl } from "../../App";
import Heading from "../../components/Heading";
import Loader from "../../components/Loader";

const AllBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    setLoading(true);
    axios
      .get(`${backendurl}/api/blogs`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };


  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      imageUrl: blog.imageUrl,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (blog) => {
    // Confirm delete action
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirmed) {
      axios
        .delete(`${backendurl}/api/blogs/${blog._id}`)
        .then(() => {
          fetchBlogs(); // Refresh the list of blogs after deletion
        })
        .catch((err) => {
          console.error("Delete error:", err);
        });
    }
  };

  const handleUpdate = () => {
    if (!selectedBlog) return;

    const updatedFormData = new FormData();
    updatedFormData.append("title", formData.title);
    updatedFormData.append("content", formData.content);
    updatedFormData.append("imageUrl", formData.imageUrl); // old image
    if (formData.newImageFile) {
      updatedFormData.append("image", formData.newImageFile); // new file
    }

    axios
      .put(`${backendurl}/api/blogs/${selectedBlog._id}`, updatedFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        fetchBlogs(); // refresh blog list
        setIsModalOpen(false); // close modal
        setFormData({ title: "", content: "", imageUrl: "" });
        setSelectedBlog(null);
      })
      .catch((err) => {
        console.error("Update error:", err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-5xl min-h-screen mx-auto px-4 py-10">
      <Heading text1={"All"} text2={"Blog"} />

      {loading ? (
        <Loader />
      ) : blogs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-md rounded-xl p-5 space-y-3">
              {blog.imageUrl && (
                <img
                  src={
                    blog.imageUrl.startsWith("http")
                      ? blog.imageUrl
                      : `${backendurl}${blog.imageUrl}`
                  }
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-md"
                />
              )}

              <h2 className="text-xl font-semibold text-gray-800">
                {blog.title}
              </h2>
              <p className="text-gray-600">{blog.content.slice(0, 100)}...</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                <span>👍 {blog.likes}</span>
                <span>💬 {blog?.comments?.length || 0}</span>
                <span>📅 {new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="flex gap-2">
                <button
                  className="text-white-600 hover:bg-transparent bg-yellow-400 border-2 border-yellow-400  text-white px-4 rounded hover:text-yellow-400 transition cursor-pointer"
                  onClick={() => handleEditClick(blog)}>
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white border-2 border-red-500 hover:bg-transparent hover:text-red-500 px-4 rounded cursor-pointer"
                  onClick={() => handleDeleteClick(blog)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No Blogs yet.</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-2xl shadow-xl relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
              ✏️ Edit Blog
            </h2>

            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">
                Title
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Blog title..."
                  className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </label>

              <label className="block text-sm font-semibold text-gray-700">
                Content
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Blog content..."
                  rows={5}
                  className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
              </label>

              <label className="block text-sm font-semibold text-gray-700 mt-2">
                Change Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      newImageFile: e.target.files[0],
                    })
                  }
                  className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </label>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-gray-300 border-2 border-gray-300 hover:bg-transparent cursor-pointer hover:text-red-500  text-gray-800 px-5 py-2 rounded-lg transition-all"
                onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button
                className="bg-blue-600 border-2 border-blue-600 cursor-pointer hover:bg-transparent hover:text-blue-600 text-white px-5 py-2 rounded-lg transition-all"
                onClick={handleUpdate}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBlog;
