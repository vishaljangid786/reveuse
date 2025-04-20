const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const blogRoutes = require("./routes/BlogRoutes");
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

dotenv.config();

const app = express();
connectDB();

const corsOptions = {
  origin: "https://the-reveuse.vercel.app/",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 600, // Cache preflight request for 10 minutes
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/blogs", blogRoutes);

app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;

  // Check if credentials match the static user
  if (
    email === process.env.STATIC_EMAIL &&
    password === process.env.STATIC_PASSWORD) {
    // Generate token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.json({
      message: "Login successful",
      token,
    });
  }

  return res.status(401).json({
    message: "Invalid email or password",
  });
});


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
