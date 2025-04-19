import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backendurl } from "../App";
import EmojiPicker from "emoji-picker-react";
import { formatDistanceToNow } from "date-fns"; // Importing date-fns
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [commentImage, setCommentImage] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);

  // State to toggle comments visibility
  const [showComments, setShowComments] = useState(false);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${backendurl}/api/blogs/${id}`);
      const blogData = res.data;
      setBlog(blogData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Update view count on backend each time the page is loaded or reloaded
    axios
      .put(`${backendurl}/api/blogs/${id}/view`)
      .then((response) => {
        fetchBlog(); // Refresh the blog data after updating the view count
      })
      .catch((err) => {
        console.log("Error updating view count:", err);
      });
  }, [id]);

  const handleLike = () => {
    const token = localStorage.getItem("token");

    if (!hasLiked) {
      // Like the blog
      axios
        .put(
          `${backendurl}/api/blogs/${id}/like`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          setHasLiked(true); // Update state to show the liked state
          fetchBlog(); // Refresh blog data if necessary
        })
        .catch((err) => console.log(err));
    } else {
      // Un-like the blog
      axios
        .put(
          `${backendurl}/api/blogs/${id}/unlike`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          setHasLiked(false); // Update state to show unliked state
          fetchBlog(); // Refresh blog data if necessary
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", commentText);
    if (commentImage) formData.append("image", commentImage);
    const token = localStorage.getItem("token");

    axios
      .post(`${backendurl}/api/blogs/${id}/comments`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setCommentText("");
        setCommentImage(null);
        fetchBlog();
      })
      .catch((err) => console.log(err));
  };

  const handleEmojiClick = (emojiData) => {
    setCommentText((prev) => prev + emojiData.emoji);
  };

  // Toggle comments visibility
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  if (!blog) return <p className="text-center mt-10">Loading blog...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      {blog.imageUrl && (
        <img
          src={`${backendurl}${blog.imageUrl}`}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg"
        />
      )}
      <h1 className="text-4xl font-extrabold text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {blog.title}
      </h1>
      <p className="text-lg text-gray-800">{blog.content}</p>

      <div className="text-gray-600 text-sm flex flex-wrap gap-6 items-center mt-2">
        {/* Date */}
        <span className="flex items-center gap-2 text-gray-500">
          <i className="fa-regular fa-calendar text-lg"></i>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </span>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className="flex items-center cursor-pointer hover:bg-slate-100 px-2 rounded gap-2 text-blue-600 hover:text-blue-800 transition-all font-medium">
          <i className="text-xl hover:text-blue-700">
            {hasLiked ? (
              <i className="fa-solid fa-heart"></i>
            ) : (
              <i className="fa-regular fa-heart"></i>
            )}
          </i>
          <span>{blog.likes}</span> Like
        </button>

        {/* Toggle Comments */}
        <button
          onClick={toggleComments}
          className="flex items-center gap-2 text-gray-600 cursor-pointer">
          <i className="fa-regular fa-comment text-lg"></i>
          <span>{blog.comments?.length || 0} Comments</span>
        </button>

        {/* Toggle Views */}
        <button className="flex items-center gap-2 text-gray-600 cursor-pointer">
          <i className="fa-solid fa-eye text-lg"></i>
          <span>{blog.views} Views</span>
        </button>
      </div>

      {/* Comment Form */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Leave a comment</h2>
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            rows={3}
            placeholder="Write something awesome..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />

          {/* Image Input and Emoji Toggle */}
          <div className="flex items-center flex-wrap gap-4">
            {/* Custom File Upload Button */}
            <label className="cursor-pointer bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition">
              📁 Choose Image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCommentImage(e.target.files[0])}
                className="hidden"
              />
            </label>

            {/* Emoji Toggle Button */}
            <button
              type="button"
              onClick={() => setShowEmoji(!showEmoji)}
              className="text-sm cursor-pointer text-blue-600 hover:underline">
              {showEmoji ? "Hide Emojis" : "Add Emoji 😄"}
            </button>

            {/* Preview Selected Image */}
            {commentImage && (
              <div className="relative w-20 h-20">
                <img
                  src={URL.createObjectURL(commentImage)}
                  alt="Preview"
                  className="rounded-md w-full h-full object-cover border"
                />
                <button
                  type="button"
                  onClick={() => setCommentImage(null)}
                  className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full text-xs w-5 h-5 flex items-center justify-center hover:bg-red-100 transition"
                  title="Remove">
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Emoji Picker */}
          {showEmoji && (
            <div className="w-fit border rounded-md p-2">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300 shadow-md hover:shadow-lg">
            💬 Post Comment
          </button>
        </form>
      </div>

      {/* Conditional Rendering of Comments */}
      {showComments && (
        <div className="bg-white p-6 rounded-xl shadow-md space-y-5">
          <h2 className="text-2xl font-semibold">Comments</h2>
          {blog.comments
            .filter((c) => (c.text && c.text.trim() !== "") || c.imageUrl)
            .map((comment, idx) => (
              <div
                key={idx}
                className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-lg shadow-sm">
                {comment.text && (
                  <p className="text-gray-800 text-base mb-2">{comment.text}</p>
                )}
                {comment.imageUrl && (
                  <img
                    src={`${backendurl}${comment.imageUrl}`}
                    alt="Comment"
                    className="w-32 h-auto rounded-md mb-2"
                  />
                )}
                <div className="text-sm text-gray-500 italic">
                  — {comment.userName || "User"} •{" "}
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
