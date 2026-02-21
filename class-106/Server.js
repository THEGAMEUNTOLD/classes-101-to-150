// ======================================================
// 1. Environment Setup
// ======================================================
require("dotenv").config();

/*
Loads environment variables from .env file.
*/


// ======================================================
// 2. Import App
// ======================================================
const app = require("./src/App");

/*
Imports configured Express application.
*/


// ======================================================
// 3. Server Configuration
// ======================================================
const PORT = process.env.PORT || 5000;


/*
Defines server port from environment.
*/


// ======================================================
// 4. Start Server
// ======================================================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*
Starts HTTP server and listens for requests.
*/