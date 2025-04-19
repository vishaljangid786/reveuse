const User = require("../models/User"); // Assuming your User model is in the 'models' directory
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // For creating JSON Web Tokens

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error logging in user", error: err.message });
  }
};

// Get the current user's data
const getUserData = async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error in getUserData controller:", error); // ✅ You will now see this
    res.status(500).json({ message: "Server error" });
  }
};
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user details", error: err.message });
  }
};

module.exports = { registerUser, loginUser, getUserData ,getUserById};
