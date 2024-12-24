const express = require("express");
const app = express();
require('dotenv').config();
require("./models/config");
const cors = require('cors');
const bodyParser = require("body-parser");
const router = require('./routes');
app.use(cors());
// Middleware setup
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Main routes
app.use('/api', router);

// Handle 404 (Route Not Found)
app.use((req, res, next) => {
  res.status(404).json({ error: "Route Not Found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error for debugging
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const server = app.listen(process.env.PORT, function () {
  console.log(`Server is running on:${process.env.PORT}`);
});

module.exports = server;
