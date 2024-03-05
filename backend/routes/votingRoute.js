const express = require('express');
const router = express.Router();
const votePlanController = require('../controllers/votingController');
// const authenticateToken = require('../middleware/tokenValidation');

router.post('/vote-restaurant', votePlanController.vote);
module.exports = router;