module.exports = (votingTimerService) => {
	const express = require('express');
	const router = express.Router();
	const { createPlan } = require('../controllers/createPlanController')(votingTimerService);

	router.post('/create-plan', createPlan);
	return router;
};