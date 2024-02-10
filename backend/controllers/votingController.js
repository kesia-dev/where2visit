const getPlan = require('../models/create-plan');
const getUser = require('../models/user');
const voteRestaurant = require('../models/restaurant');

exports.vote = async (req, res) => {
  const payload = req.body; // Payload containing planId, restaurantId and voteType

  try {
    // Get plan by planId from payload
    const plan = await getPlan.findOne({ roomId: payload.roomId });

    // Check if plan exists
    if (!plan) {
      return res.status(404).json({
        error: 'Plan not found'
      });
    };

    // Get plan by restaurantId from payload
    const restaurant = plan.restaurants.id(payload.restaurantId);

    // Check if restaurant exists
    if (!restaurant) {
      return res.status(404).json({
        error: 'Restaurant not found'
      });
    }


    // Check if user has already voted for positive or negative
    if (restaurant.positiveVotes.includes(payload.voterName) || restaurant.negativeVotes.includes(payload.voterName)) {
      return res.status(400).json({
        error: 'User has already voted'
      });
    };

    let getVoteField, incrementVote;

    // Check vote field and increment or decrement vote
    if (payload.voteType === 'positive') {
      getVoteField = 'positiveVotes';
      incrementVote = 1;

    } else if (payload.voteType === 'negative') {
      getVoteField = 'negativeVotes';
      incrementVote = 1;

    } else {
      return res.status(400).json({
        error: 'Invalid vote type'
      });
    }

    // Update to positive or negative user and vote count
    restaurant[getVoteField].push(payload.voterName);
    restaurant.voteCount += incrementVote; // voteCount is a number field
    await plan.save();

    res.json({
      message: 'Vote posted successfully'
    });

  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({
      error: 'Server error'
    });
  }
}