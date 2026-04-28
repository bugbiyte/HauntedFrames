// // controllers/movieController.js
// const Movie = require('../models/movies');

// // GET /api/movies/:mood  -> random movie for that mood
// exports.getRandomMovieByMood = async (req, res) => {
//   try {
//     const mood = req.params.mood; // "bloody-sad", "freaky-but-chic"
//     console.log('API mood:', mood);

//     // find movies where mood array contains this mood
//     const movies = await Movie.find({ mood });

//     if (!movies.length) {
//       return res.status(404).json({ error: 'No movies for that mood yet.' });
//     }

//     const randomMovie = movies[Math.floor(Math.random() * movies.length)];
//     return res.json(randomMovie);
//   } catch (err) {
//     console.error('Error fetching movie by mood:', err);
//     return res.status(500).json({ error: 'Server error fetching movie.' });
//   }
// };

// // GET /movie/:id -> render details page
// exports.showMoviePage = async (req, res) => {
//   try {
//     const movie = await Movie.findById(req.params.id);
//     if (!movie) {
//       return res.status(404).send('Movie not found');
//     }
//     res.render('movie', { title: movie.title, movie });
//   } catch (err) {
//     console.error('Error loading movie page:', err);
//     res.status(500).send('Server error');
//   }
// };
// controllers/moviecontroller.js
const Movie = require('../models/movies');
const Vote = require('../models/Vote');
const User = require('../models/User');

// GET /api/movies/:mood  -> random movie for that mood
exports.getRandomMovieByMood = async (req, res) => {
  try {
    const mood = req.params.mood; // e.g. "freaky-but-chic"
    console.log('API mood:', mood);

    const movies = await Movie.aggregate([
      { $match: { mood } },        // mood: ["freaky-but-chic", ...]
      { $sample: { size: 1 } }     // pick ONE random movie
    ]);

    console.log('Matched movies count:', movies.length);
    if (movies[0]) {
      console.log('Random movie picked:', movies[0].title);
    }

    if (!movies.length) {
      return res.status(404).json({ error: 'No movies for that mood yet.' });
    }

    return res.json(movies[0]);
  } catch (err) {
    console.error('Error fetching movie by mood:', err);
    return res.status(500).json({ error: 'Server error fetching movie.' });
  }
};

// GET /movie/:id -> render details page
exports.showMoviePage = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).send('Movie not found');
    }
    res.render('movie', { title: movie.title, movie });
  } catch (err) {
    console.error('Error loading movie page:', err);
    res.status(500).send('Server error');
  }
};

// POST /api/movies/:id/vote
exports.voteMovie = async (req, res) => {
  const { vote } = req.body;
  const { id: movieId } = req.params;

  if (!['up', 'down'].includes(vote)) {
    return res.status(400).json({ error: 'Invalid vote.' });
  }

  if (!req.user) {
    return res.json({ saved: false, message: 'Log in to save votes to your profile.' });
  }

  const userId = req.user._id;

  await Vote.findOneAndUpdate(
    { userId, movieId },
    { vote },
    { upsert: true, new: true }
  );

  if (vote === 'up') {
    await User.findByIdAndUpdate(userId, { $addToSet: { savedMovies: movieId } });
  } else {
    await User.findByIdAndUpdate(userId, { $pull: { savedMovies: movieId } });
  }

  return res.json({ saved: true, vote });
};
