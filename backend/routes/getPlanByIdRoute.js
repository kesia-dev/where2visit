const express = require('express');
const router = express.Router();
const getPlanByIdController = require('../controllers/getPlanByIdController');

router.get('/get-plan', getPlanByIdController.getPlanById);
module.exports = router;