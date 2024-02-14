const getPlan = require('../models/create-plan');

exports.getPlanById = async (req, res) => {
  try {
    const planCode = req.query.planCode;

    console.log('plan code', planCode);

    if (!planCode) {
      return res.status(400).json({
        error: 'Missing planCode in query parameters',
      });
    }

    const plan = await getPlan.findOne({ roomId: planCode });

    if (!plan) {
      return res.status(404).json({
        error: 'Plan not found',
      });
    }

    const { planName, hostName, dateOfEvent, timeOfEvent, location, radius, cuisine, rating, priceRange, numberOfResults, numberOfMatches, restaurants } = plan;

    return res.json({
      planName,
      hostName,
      dateOfEvent,
      timeOfEvent,
      location,
      radius,
      cuisine,
      rating,
      priceRange,
      numberOfResults,
      numberOfMatches,
      restaurants,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
