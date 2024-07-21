const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connectDB');
const router = require('./routes/index');
const cookiesParser = require('cookie-parser');
const { app, server } = require('./socket/index');

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}));

app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 8080;

// Handle preflight requests
app.options('*', cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}));

app.get('/', (request, response) => {
    response.json({
        message: "Server running at " + PORT
    });
});

// API endpoints
app.use('/api', router);

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log("server running at " + PORT);
    });
});