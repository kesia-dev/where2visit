const express = require('express');
const router = express.Router();
const { joinPlan } = require('../controllers/joinPlanController');

router.post('/join', joinPlan);
module.exports = router;