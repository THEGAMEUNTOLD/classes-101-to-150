// ======================================================
// 1. Core Dependencies
// ======================================================
const express = require("express");
const router = express.Router();

/*
Creates a modular Express router.
This keeps follow-related endpoints separate from other features.
*/


// ======================================================
// 2. Controller Import
// ======================================================
const followController = require("../Controller/Follow.Controller");

/*
Imports controller object containing all follow functions.

Expected structure:
{
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
}
*/


// ======================================================
// 3. Middleware Imports
// ======================================================
const authMiddleware = require("../middleware/Auth.middleware");

/*
Authentication middleware.

Responsibilities:
✔ verifies JWT token
✔ ensures user is logged in
✔ attaches user data to req.user
*/


// ======================================================
// 4. Parameter Validation Middleware
// ======================================================
const validateUserId = (req, res, next) => {
  const { userId } = req.params;

  if (!userId || userId.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  next();
};

/*
Ensures userId exists before reaching controller logic.
Prevents invalid database queries and runtime errors.
*/


// ======================================================
// 5. Protected Routes (Login Required)
// ======================================================

router.post(
  "/:userId",
  authMiddleware,
  validateUserId,
  followController.followUser
);

router.delete(
  "/:userId",
  authMiddleware,
  validateUserId,
  followController.unfollowUser
);

/*
POST    → Follow a user
DELETE  → Unfollow a user

Security flow:
1️⃣ authMiddleware validates token
2️⃣ validateUserId checks param
3️⃣ Controller executes business logic
*/


// ======================================================
// 6. Public Routes (No Authentication Required)
// ======================================================

router.get(
  "/followers/:userId",
  validateUserId,
  followController.getFollowers
);

router.get(
  "/following/:userId",
  validateUserId,
  followController.getFollowing
);

/*
GET followers  → list of users who follow target user
GET following  → list of users target user follows

Used for:
✔ profile pages
✔ social graphs
✔ analytics
*/


// ======================================================
// 7. Export Router
// ======================================================
module.exports = router;

/*
Makes routes available to main app.

Example usage:
app.use("/api/v1/follow", followRoutes);
*/