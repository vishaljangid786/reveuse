import React, { useState } from "react";
import axios from "axios";
import { backendurl } from "../App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Fixed typo here: setMessagte -> setMessage
  const [token, setToken] = useState(""); // Storing JWT token

  const navigate = useNavigate(); // For navigation after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendurl}/api/users/login`,
        {
          email,
          password,
        }
      );
      setToken(response.data.token);
      setMessage("Login successful!");
      navigate('/admin/createblog')
      setEmail("");
      setPassword("");
      localStorage.setItem("token", response.data.token); // Redirect to profile after 2 seconds
    } catch (error) {
      setMessage(
        error.response ? error.response.data.message : "Something went wrong!"
      );
    }
  };

  return (
    <div className="h-screen items-center justify-center flex">
      <div className="w-md mx-auto p-6 border rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {message && <p className="text-red-600 text-center mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Admin Email"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Admin Password"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
