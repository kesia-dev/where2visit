module.exports = (votingTimerService) => {
  const express = require('express');
  const router = express.Router();
  const { joinPlan } = require('../controllers/joinPlanController')(votingTimerService);

  router.post('/join', joinPlan);
  return router;
}