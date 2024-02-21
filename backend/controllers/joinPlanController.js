const Plan = require('../models/create-plan');

exports.joinPlan = async (req, res) => {
    try {
      // Extract the username and plan code from the frontend request body: 
      const { userName, planCode } = req.body;
  
      // Find the plan by its code:
      const plan = await Plan.findOne({ roomId: planCode });
      if (!plan) {
        return res.status(404).send('Plan not found');
      }
  
      // Check if the username already exists in the plan's participants:
      const isExistingParticipant = plan.participants.includes(userName);
      if (isExistingParticipant) {
        return res.status(400).send('User has already joined this plan');
      }
  
      // Add the username to the plan's participants and save:
      plan.participants.push(userName);
      await plan.save();
  
      res.status(200).json({ message: `${userName} has successfully joined the plan`, plan });
    } catch (error) {
      console.error('Error joining plan:', error);
      res.status(500).json({ error: 'Failed to join plan' });
    }
  };
  