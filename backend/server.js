const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const blogRoutes = require("./routes/BlogRoutes");
const serviceRoutes = require("./routes/ServiceRoute");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 600, // Cache preflight request for 10 minutes
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/services", serviceRoutes);

app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;

  // Check if credentials match the static user
  if (
    email === process.env.STATIC_EMAIL &&
    password === process.env.STATIC_PASSWORD
  ) {
    // Generate token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      message: "Login successful",
      token,
    });
  }

  return res.status(401).json({
    message: "Invalid email or password",
  });
});

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// For Vercel deployment
module.exports = app;

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
