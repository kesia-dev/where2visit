module.exports = (votingTimerService) => {
  const plan = require('../models/create-plan');
  const { fetchYelpRestaurants } = require('../services/yelpService');

  // generate room id
  const generateRoomId = () => {
    let genRandomInti = '';
    let randomArray = [];
    let genRandomChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const maxLength = 5;

    for (let i = 0; i < maxLength; i++) {
      let genChar = Math.floor(Math.random() * genRandomChar.length);

      genRandomInti = genRandomInti + genRandomChar.charAt(genChar);

      randomArray.push(genRandomInti);
    }

    return genRandomInti;
  };

  const createPlan = async (req, res) => {
    console.log('Create Plan Request:', req.body);
    try {
      const getRoomId = generateRoomId();

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
        numberOfMatches
      } = req.body;

      // Fetch restaurant from Yelp based on user's input:
      const restaurants = await fetchYelpRestaurants({
        latitude: location?.latitude,
        longitude: location?.longitude,
        radius,
        categories: [cuisine],
        limit: numberOfResults,
        price: priceRange,
        minRating: rating
      });

      if (restaurants && restaurants.length == 0) {
        return res.status(404).json({ error: 'No restaurant found', message: "Please choose a different location" });
      }
      // Add host to participants list:
      const participants = [{ username: hostName, isHost: true }]

      const newPlan = await plan.create({
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
        participants,
        roomId: getRoomId
      });
      console.log('Before saving plan', newPlan);
      await newPlan.save();

      // Reset the voting session timer for the plans:
      votingTimerService.reset(getRoomId);

      return res.status(201).json({
        message: 'Plan registered successfully',
        roomId: getRoomId,
        // THis is to include the restaurantIds in the response for the frontend to use for voting:
        restaurantIds: newPlan.restaurants.map(restaurant => restaurant._id)
      });
    } catch (error) {
      console.error('Error in createPlan:', error);
      return res.status(500).json({ error: 'Failed to create plan' });
    }
  };
  return { createPlan };
};
