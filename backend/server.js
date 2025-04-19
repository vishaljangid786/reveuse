const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken')

require('dotenv').config();

const blogRoutes = require('./routes/blogRoutes');
const serviceRoutes = require('./routes/serviceRoute');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));


app.use('/api/blogs', blogRoutes);
app.use('/api/services', serviceRoutes);

app.get("/", (req, res) => {
  res.send("🚀 API is working!");
});

app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  const staticEmail = process.env.STATIC_EMAIL;
  const staticPassword = process.env.STATIC_PASSWORD;

  if (email === staticEmail && password === staticPassword) {
    // Create token
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Send token in cookie or JSON response
    res.status(200).json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});


exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
}).catch(err => console.error(err));