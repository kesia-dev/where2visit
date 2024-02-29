const Plan = require('../models/create-plan');

module.exports = (votingTimerService) => {
  const joinPlan = async (req, res) => {
    try {
      const { userName, planCode } = req.body;
      const plan = await Plan.findOne({ roomId: planCode });

      if (!plan) {
        return res.status(404).send('Plan not found');
      }

      if (!plan.isActive) {
        return res.status(403).send('This plan is no longer active. The session has been ended by the host');
      }

      // Check if the user has already joined the plan:
      const isExistingParticipant = plan.participants.some(participant => participant.username === userName);
      if (isExistingParticipant) {
        return res.status(409).json('User has already joined this plan');
      }

      // Add the user to the plan:
      plan.participants.push({ username: userName, isHost: false });
      await plan.save();
      // Return the updated plan:
      res.status(200).json({ message: `${userName} has successfully joined the plan`, plan });
    } catch (error) {
      console.error('Error joining plan:', error);
      res.status(500).json({ error: 'Failed to join plan' });
    }
  };

  return { joinPlan };
};