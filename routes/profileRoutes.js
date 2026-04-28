const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const profileController = require('../controllers/profileController');

router.get('/profile', requireAuth, profileController.getProfile);
router.post('/api/profile/unsave/:movieId', requireAuth, profileController.unsaveMovie);

module.exports = router;
