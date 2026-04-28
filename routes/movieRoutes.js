// // routes/movieRoutes.js
// const express = require('express');
// const router = express.Router();
// const movieController = require('../controllers/moviecontroller');

// // API endpoint used by the cards
// router.get('/api/movies/:mood', movieController.getRandomMovieByMood);

// // Page to show a single movie
// router.get('/movie/:id', movieController.showMoviePage);

// module.exports = router;
const express = require('express');
const router = express.Router();
const attachUser = require('../middleware/attachUser');
const movieController = require('../controllers/moviecontroller');

router.get('/api/movies/:mood', movieController.getRandomMovieByMood);
router.get('/movie/:id', movieController.showMoviePage);
router.post('/api/movies/:id/vote', attachUser, movieController.voteMovie);

module.exports = router;
