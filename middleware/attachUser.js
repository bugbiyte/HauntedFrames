const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Soft auth — attaches req.user if a valid JWT cookie is present, otherwise req.user = null.
// Use this on routes that work for both guests and logged-in users.
module.exports = async (req, res, next) => {
  const token = req.cookies?.jwt;
  if (!token) {
    req.user = null;
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-passwordHash');
  } catch {
    req.user = null;
  }
  next();
};
