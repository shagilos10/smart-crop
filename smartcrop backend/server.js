const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./config/db'); // Import the connectDB function

// Load environment variables
dotenv.config();

// Environment Variables
const PORT = process.env.PORT || 5000;

// Database Connection
connectDB(); // Call the connectDB function to establish the connection

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
