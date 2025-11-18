// // routes/movieRoutes.js
// const express = require('express');
// const router = express.Router();
// const movieController = require('../controllers/moviecontroller');

// // API endpoint used by the cards
// router.get('/api/movies/:mood', movieController.getRandomMovieByMood);

// // Page to show a single movie
// router.get('/movie/:id', movieController.showMoviePage);

// module.exports = router;
// routes/movieRoutes.js
const express = require('express');
const router = express.Router();

const movieController = require('../controllers/moviecontroller'); 
// ⚠️ must match your file name EXACTLY (case-sensitive)

router.get('/api/movies/:mood', movieController.getRandomMovieByMood);
router.get('/movie/:id', movieController.showMoviePage);

module.exports = router;
