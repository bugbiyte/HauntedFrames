const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    vote: { type: String, enum: ['up', 'down'], required: true },
  },
  { timestamps: true }
);

// One vote per user per movie — upsert replaces instead of duplicating
voteSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model('Vote', voteSchema);
