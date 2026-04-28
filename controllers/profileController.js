const User = require('../models/User');
const Vote = require('../models/Vote');

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).populate('savedMovies');
  res.render('profile', { title: 'My Profile', movies: user.savedMovies });
};

exports.unsaveMovie = async (req, res) => {
  const { movieId } = req.params;
  await User.findByIdAndUpdate(req.user._id, { $pull: { savedMovies: movieId } });
  await Vote.findOneAndDelete({ userId: req.user._id, movieId });
  return res.json({ ok: true });
};
