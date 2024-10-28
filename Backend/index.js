// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const RouterProduct=require("./routes/auth");
const authRoutes = require("./routes/auth"); // Import auth routes

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // For parsing application/json

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
// const authRoutes = require('./routes/auth'); // Uncomment if you have auth routes
// app.use('/auth', authRoutes); // Adjust the path as necessary

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use("/", authRoutes); // Use auth routes


app.use("/",RouterProduct);
