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
// controllers/movieController.js
// controllers/movieController.js
// controllers/moviecontroller.js
const Movie = require('../models/movies'); // make sure this filename exists

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
