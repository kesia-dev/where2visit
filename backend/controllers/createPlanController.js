const createPlan = require('../models/create-plan');

exports.createPlan = async (req, res) => {
  try {
    const {
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
        restaurants
      } = req.body;
      const { latitude, longitude } = location;
      const newPlan = new createPlan({
        planName,
        hostName,
        dateOfEvent,
        timeOfEvent,
        location: {
          latitude,
          longitude,
        },
        radius,
        cuisine,
        rating,
        priceRange,
        numberOfResults,
        numberOfMatches,
        restaurants
    });
      await newPlan.save();

    
    return res.status(201).json({ message: 'Plan registered successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
