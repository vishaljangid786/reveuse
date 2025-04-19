const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token with your secret
    req.user = decoded; // Attach user data to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const isAuthenticated = authMiddleware; // Alias for authMiddleware

module.exports = {
  authMiddleware,
  isAuthenticated
};
