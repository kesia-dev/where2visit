const getPlan = require('../models/create-plan');

exports.getPlanById = async (req, res) => {
  try {
    const planCode = req.query.planCode;
    console.log('plan code', planCode);

    const plan = await getPlan.findOne({ roomId: planCode });

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