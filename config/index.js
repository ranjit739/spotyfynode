const dotenv = require('dotenv')
dotenv.config()
module.exports = {
  jwtSecret: process.env.JWT_SECRET || "defaultSecret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
  dbUrl: process.env.DB_URL || "mongodb://127.0.0.1:27017/test",
};
