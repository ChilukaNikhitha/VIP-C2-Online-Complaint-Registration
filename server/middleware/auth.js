const jwt = require("jsonwebtoken");

// ===============================
// 🔐 AUTH MIDDLEWARE
// ===============================
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // safer extraction
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user to request
    req.user = decoded; // { id, role }

    next();
  } catch (err) {
    console.log("AUTH ERROR:", err.message);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

// ===============================
// 🔐 ADMIN MIDDLEWARE
// ===============================
const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  next();
};

module.exports = {
  authMiddleware,
  adminMiddleware,
};