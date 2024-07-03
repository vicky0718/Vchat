const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require('./config/connectDB');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const { app, server } = require("./socket/index");

// Ensure FRONTEND_URL is set in your .env file
// e.g., FRONTEND_URL=http://192.168.1.x:4000

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Define allowed methods
}));

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.get("/", (request, response) => {
  response.json({
    message: "Server running at " + PORT,
  });
});

// API endpoint
app.use('/api', router);

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("server is running at ==> " + PORT);
  });
}).catch(err => {
  console.error('Failed to connect to database:', err);
});