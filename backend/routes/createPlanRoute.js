const express = require('express');
const router = express.Router();
const createPlanController = require('../controllers/createPlanController');

router.post('/create-plan', createPlanController.createPlan);
module.exports = router;