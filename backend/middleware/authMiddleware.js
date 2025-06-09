// authMiddleware.js — Middleware to protect private routes by verifying JWT

const jwt = require('jsonwebtoken'); // Require jsonwebtoken library to decode and verify JWT tokens

// Middleware function to check if the incoming request has a valid token
const authenticateToken = (req, res, next) => {
  // Authorization header and EXTRACT token
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expected format: "Bearer TOKEN"

  // If no token provided, return 401 Unauthorized
  if (!token) return res.sendStatus(401);

  // Verify the token using the secret from environment variables
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // 🔐 Invalid or expired token
    req.user = user; // Attach decoded user data to request object
    next(); // Proceed to the next middleware/controller
  });
};

module.exports = { authenticateToken }; // Export middleware to use in routes