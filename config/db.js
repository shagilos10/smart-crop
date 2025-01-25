// db.js
const mongoose = require('mongoose');

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://danialemayehu32:1mI7pLFKEatYbZrq@cluster0.avg6l.mongodb.net/';

// Function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = connectDB;
