// ======================================================
// 1. Core Dependencies
// ======================================================
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

/*
Core framework and security tools.

express       → HTTP server framework
cookieParser  → Parses cookies into req.cookies
cors          → Controls cross-origin requests
helmet        → Sets secure HTTP headers
morgan        → HTTP request logger (dev friendly)
*/


// ======================================================
// 2. Route Imports
// ======================================================
const AuthRoutes = require("./Routes/Auth.routes");
const PostRoutes = require("./Routes/Post.routes");
const FollowRoutes = require("./Routes/Follow.routes");
const LikeRoutes = require("./Routes/Like.routes");

/*
Route modules grouped by feature domain.

AuthRoutes    → Authentication system
PostRoutes    → Posts CRUD operations
FollowRoutes  → Follow / unfollow system
LikeRoutes    → Post like system
*/


// ======================================================
// 3. Create Express Application
// ======================================================
const app = express();

/*
Creates the main Express application instance.
All middleware and routes are attached here.
*/


// ======================================================
// 4. Security Middlewares
// ======================================================
app.use(helmet());

app.use(cors({
  origin: true,        // allow frontend origin
  credentials: true    // allow cookies across origin
}));

/*
Security layer.

helmet() → Protects from common web vulnerabilities
cors()   → Controls which clients can access API
*/


// ======================================================
// 5. Global Parsing Middlewares
// ======================================================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/*
Request body parsing.

express.json()        → Parses JSON request body
express.urlencoded()  → Parses form submissions
cookieParser()        → Reads cookies from headers
*/


// ======================================================
// 6. Request Logger (Development Only)
// ======================================================
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/*
Logs HTTP requests in development environment.
Helps debugging API activity.
*/


// ======================================================
// 7. API Route Mounting (Versioned)
// ======================================================
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/posts", PostRoutes);
app.use("/api/v1/follow", FollowRoutes);
app.use("/api/v1/like", LikeRoutes);

/*
Feature-based API routing.

Example endpoints:

POST   /api/v1/auth/login
POST   /api/v1/posts
POST   /api/v1/follow/:userId
GET    /api/v1/follow/followers/:userId
POST   /api/v1/like/:postId
*/


// ======================================================
// 8. Health Check Route
// ======================================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running successfully"
  });
});

/*
Server status endpoint.

Used by:
✔ browsers
✔ load balancers
✔ monitoring services
✔ deployment health checks
*/


// ======================================================
// 9. 404 Not Found Middleware
// ======================================================
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

/*
Handles unknown endpoints.

Prevents:
✖ hanging requests
✖ unclear responses
*/


// ======================================================
// 10. Global Error Handler
// ======================================================
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

/*
Centralized error management.

Captures:
✔ controller errors
✔ async errors
✔ middleware errors
✔ database errors

Keeps API responses consistent.
*/


// ======================================================
// 11. Export Application
// ======================================================
module.exports = app;

/*
Exports Express app for server startup.

Used in server.js to start listening.
*/