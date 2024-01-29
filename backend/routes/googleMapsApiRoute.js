const express = require('express');
const router = express.Router();
const getNearestRestaurants = require('../controllers/googleMapsApiController');

router.post('/get-nearest-restaurants', getNearestRestaurants.getNearestRestaurants);
module.exports = router;