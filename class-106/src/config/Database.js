// Import the mongoose library for MongoDB interactions
const mongoose = require("mongoose");

/**
 * Connects to MongoDB using the connection string in environment variables.
 * This function is asynchronous and handles errors gracefully.
 */
const connectToDatabase = async () => {
  try {
    // Attempt to connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,      // Use new URL string parser
      useUnifiedTopology: true,   // Use new server discovery and monitoring engine
    });

    // If connection is successful, log confirmation
    console.log("✓ MongoDB Connected Successfully");
  } catch (error) {
    // If there is an error during connection, log the error and exit process
    console.error("✗ Database Connection Error:", error.message);
    process.exit(1); // Exit the Node.js process with failure code
  }
};

// Export the function to use in other parts of the application
module.exports = connectToDatabase;

/*
--------------------------------------------------------
Explanation of the code:

1. Import mongoose: Required to interact with MongoDB.
2. connectToDatabase function: Async function to connect to the DB.
3. mongoose.connect: Connects using the MONGO_URL environment variable.
4. Options:
   - useNewUrlParser: Ensures proper parsing of the MongoDB connection string.
   - useUnifiedTopology: Enables the new topology engine to avoid deprecation warnings.
5. Error Handling:
   - If connection fails, log the error and terminate the application to avoid undefined DB states.
6. Export: Makes the connectToDatabase function usable in other files (e.g., app.js or server.js).
--------------------------------------------------------
*/