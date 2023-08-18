const jwt = require("jsonwebtoken");

// Middleware to verify token and check user role
const authenticateAndAuthorize = (req, res, next) => {
  const token = req.cookies.token || req.body.token;
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const userRole = decodedToken.role;

    if (userRole === "ADMIN") {
      next();
    } else if (userRole === "VIEWER") {
      res.status(403).json({ message: "Permission denied" });
    } else {
      res.status(403).json({ message: "Permission denied" });
    }
  });
};

module.exports = authenticateAndAuthorize;
