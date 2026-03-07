const express = require("express");
const upload = require("../Middleware/Upload.middleware");
const SongController = require("../Controllers/Song.controller")

const router = express.Router();

/**
 * POST /api/songs/
 * Request body: FormData with "song" (audio file) and "mood" (string)
 * Response: Uploaded song details
 * Access: Public
 */
router.post("/", upload.single("song"),SongController.uploadSong);

/**
 * GET /api/songs/mood
 * Query params: mood (string)
 * Response: List of songs matching the mood
 * Access: Public
 */
router.get("/mood",SongController.getSongsByMood);

module.exports = router