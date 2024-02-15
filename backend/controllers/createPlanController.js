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

    const newPlan = new createPlan({
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
      roomId: getRoomId
    });

    await newPlan.save();

    return res.status(201).json({ 
      message: 'Plan registered successfully', 
      roomId: getRoomId 
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
