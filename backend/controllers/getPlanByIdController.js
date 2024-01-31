const getPlan = require('../models/create-plan');

exports.getPlanById = async (req, res) => {
  try {
    const planId = req.params.id;

    const plan = await getPlan.findById(planId);

    if (!plan) {
      return res.status(404).json({
        error: 'Plan not found'
      });
    }

    return res.json(plan);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}