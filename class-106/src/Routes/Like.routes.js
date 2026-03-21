const express = require("express");
const authMiddleware = require("../middleware/Auth.middleware");
const likeController = require("../Controller/Like.controller");

const router = express.Router();

/* =========================================================
   🔐 AUTH PROTECTION LAYER
   ---------------------------------------------------------
   All routes below require authentication.
   If JWT is invalid → request blocked.
   If valid → req.user is available in controller.
========================================================= */

router.use(authMiddleware);

/* =========================================================
   ❤️ LIKE ACTIONS
   ---------------------------------------------------------
   These routes allow a user to like or unlike a post.
   All actions are performed by the authenticated user.
========================================================= */

/**
 * @route   POST /api/likes
 * @desc    Add like to a post
 * @access  Private
 * @body    { postId }
 */
router.post("/", likeController.addLike);
// ➜ Creates a like document linking user + post


/**
 * @route   DELETE /api/likes
 * @desc    Remove like from a post
 * @access  Private
 * @body    { postId }
 */
router.delete("/", likeController.removeLike);
// ➜ Deletes user's like for the specified post


/**
 * @route   PATCH /api/likes/toggle
 * @desc    Toggle like status for a post
 * @access  Private
 * @body    { postId }
 */
router.patch("/toggle", likeController.toggleLike);
// ➜ If liked → remove like
// ➜ If not liked → add like


/* =========================================================
   📊 LIKE RETRIEVAL
   ---------------------------------------------------------
   These routes fetch like data.
   Used for UI display (like count, who liked, etc.)
========================================================= */

/**
 * @route   GET /api/likes/post/:postId
 * @desc    Get all likes for a specific post
 * @access  Private
 */
router.get("/post/:postId", likeController.getLikesForPost);
// ➜ Returns list of users who liked the post
// ➜ Typically populates user info


module.exports = router;