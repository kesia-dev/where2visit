const express = require('express');
const router = express.Router();
const votePlanController = require('../controllers/votingController');

router.post('/vote-restaurant', votePlanController.vote);
module.exports = router;