/**
 * ---------------------------------------------------------------------------
 * IMPORTS
 * ---------------------------------------------------------------------------
 * Import required modules, middleware, and controllers.
 * Controllers handle business logic.
 * Middleware handles authentication verification.
 * ---------------------------------------------------------------------------
 */
const express = require("express");
const authMiddleware = require("../middleware/Auth.middleware");

const {
  RegisterController,
  LoginController,
  LogoutController,
} = require("../Controller/Auth.Controller");


/**
 * ---------------------------------------------------------------------------
 * ROUTER INITIALIZATION
 * ---------------------------------------------------------------------------
 * Creates a modular router instance.
 * This router will be mounted in main server file (e.g., app.js).
 * ---------------------------------------------------------------------------
 */
const router = express.Router();


/**
 * ===========================================================================
 * PUBLIC AUTH ROUTES
 * ===========================================================================
 * These routes are accessible WITHOUT authentication.
 * Used for account creation and login.
 * ===========================================================================
 */


/**
 * ---------------------------------------------------------------------------
 * REGISTER USER
 * ---------------------------------------------------------------------------
 * Route: POST /api/auth/register
 * Purpose:
 * - Create a new user account
 * - Validate user input
 * - Hash password
 * - Save user in database
 *
 * Expected Request Body:
 * {
 *   name: string,
 *   email: string,
 *   password: string
 * }
 * ---------------------------------------------------------------------------
 */
router.post("/register", RegisterController);


/**
 * ---------------------------------------------------------------------------
 * LOGIN USER
 * ---------------------------------------------------------------------------
 * Route: POST /api/auth/login
 * Purpose:
 * - Verify email & password
 * - Generate JWT token
 * - Store token in HTTP-only cookie
 *
 * Expected Request Body:
 * {
 *   email: string,
 *   password: string
 * }
 * ---------------------------------------------------------------------------
 */
router.post("/login", LoginController);



/**
 * ===========================================================================
 * PROTECTED AUTH ROUTES
 * ===========================================================================
 * These routes REQUIRE a valid JWT token.
 * authMiddleware verifies token before allowing access.
 * ===========================================================================
 */


/**
 * ---------------------------------------------------------------------------
 * LOGOUT USER
 * ---------------------------------------------------------------------------
 * Route: POST /api/auth/logout
 * Access: Protected
 *
 * Purpose:
 * - Remove authentication cookie
 * - End user session
 *
 * Middleware Flow:
 * Request → authMiddleware → LogoutController
 * ---------------------------------------------------------------------------
 */
router.post("/logout", authMiddleware, LogoutController);



/**
 * ---------------------------------------------------------------------------
 * EXPORT ROUTER
 * ---------------------------------------------------------------------------
 * Makes router available to be used in main application file.
 * Example usage in app.js:
 * app.use("/api/auth", router);
 * ---------------------------------------------------------------------------
 */
module.exports = router;