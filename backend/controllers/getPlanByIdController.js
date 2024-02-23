const getPlan = require('../models/create-plan');

exports.getPlanById = async (req, res) => {
  try {
    const planCode = req.query.planCode;

    console.log('Fetching plan with code: ', planCode);

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

    const { planName, hostName, dateOfEvent, timeOfEvent, location, radius, cuisine, rating, priceRange, numberOfResults, numberOfMatches, participants, restaurants } = plan;

    console.log(`Plan fetched successfully:`, {
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
      participants,
      restaurants,
      roomId: planCode,
    });

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
      participants,
      restaurants,
      roomId: planCode,
    });
  } catch (error) {
    console.error(`Error fetching plan with code ${planCode}:`, error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};
