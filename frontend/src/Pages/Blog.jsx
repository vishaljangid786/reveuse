import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { backendurl } from "../App";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to check if the user is logged in (assuming token in localStorage)
  const isLoggedIn = () => {
    const token = localStorage.getItem("token"); // Check for token in localStorage
    return token ? true : false; // Return true if token exists, otherwise false
  };

  useEffect(() => {
    axios
      .get(`${backendurl}/api/blogs`)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-5xl min-h-screen mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">All Blogs</h1>
      {blogs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white shadow-md rounded-xl p-5 space-y-3">
                {blog.imageUrl && (
                  <img
                    src={`${backendurl}${blog.imageUrl}`}
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
                  <span>
                    📅 {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <button
                  className="text-blue-600 hover:underline cursor-pointer"
                  onClick={() => navigate(`/blogs/${blog._id}`)}>
                  Read more
                </button>
              </div>
            ))}
          </div>
      ):(
        <p className="text-center">No Blogs yet.</p>
      )}
    </div>
  );
};

export default Blog;
