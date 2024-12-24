const jwt = require('jsonwebtoken');
const config = require("../config/index")
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access denied" });
    try {
      const verified = jwt.verify(token, config.jwtSecret);
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).json({ error: "Invalid token" });
    }
  };
  
  module.exports = authMiddleware;