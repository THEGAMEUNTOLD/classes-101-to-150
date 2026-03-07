const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    posterUrl: {
        type: String
    },
    title: {
        type: String,
        required: true,
    },

    artist: String,
    album: String,
    year: String,
    genre: String,

    mood: {
    type: String,
    enum: ["sad", "happy", "surprised"],
    required: true
    }
});

const songModel = mongoose.model("songs", songSchema)

module.exports = songModel