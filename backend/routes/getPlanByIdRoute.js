const express = require('express');
const router = express.Router();
const getPlanByIdController = require('../controllers/getPlanByIdController');
const authenticateToken = require('../middleware/tokenValidation');

router.get('/get-plan/:id', authenticateToken, getPlanByIdController.getPlanById);
module.exports = router;