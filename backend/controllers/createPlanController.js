const createPlan = require('../models/create-plan');
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

exports.createPlan = async (req, res) => {
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
      latitude: location.latitude,
      longitude: location.longitude,
      radius,
      categories: [cuisine],
      limit: numberOfResults,
      price: priceRange,
      minRating: rating
    });

    // Add host to participants list:
    const participants = [{ username: hostName, isHost: true }]

    const newPlan = await createPlan.create({
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
    console.log('After saving plan');
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
