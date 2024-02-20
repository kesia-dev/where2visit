const express = require('express');
const router = express.Router();
const { getYelpNearestRestaurants } = require('../controllers/yelpSearchApiController');

router.post('/get-nearest-restaurants', getYelpNearestRestaurants);
module.exports = router;