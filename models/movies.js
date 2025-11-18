// models/Movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: Number,
    poster: String,
    description: String,
    mood: [String], // e.g. ["bloody-sad", "freaky-but-chic"]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);
