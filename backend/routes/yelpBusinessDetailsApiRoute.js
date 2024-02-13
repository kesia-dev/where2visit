const express = require('express');
const router = express.Router();
const { fetchYelpBusinessDetails } = require('../controllers/yelpBusinessDetailsController');

// On the frontend, when a user clicks on a restaurant to view more images or tries to access the menu, make a request to this endpoint, passing the restaurant's ID:
router.get('/businesses/:id', fetchYelpBusinessDetails);
module.exports = router;