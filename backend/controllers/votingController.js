const getPlan = require('../models/create-plan');

exports.vote = async (req, res) => {
  // The frontend will send the following payload:
  const { planCode, userName, restaurantId, voteType } = req.body;

  // Check for missing fields:
  if (!planCode || !userName || !restaurantId || !voteType) {
    return res.status(400).json({
      error: 'Missing required fields. Please include planCode, userName, restaurantId, and voteType.'
    });
  }

  // Validate voteType:
  if (!['positive', 'negative'].includes(voteType)) {
    return res.status(400).json({
      error: 'Invalid voteType. Expected "positive" or "negative".'
    });
  }

  try {
    // Get plan by roomId from payload:
    const plan = await getPlan.findOne({ roomId: planCode });

    // Check if plan exists:
    if (!plan) {
      return res.status(404).json({
        error: 'Plan not found'
      });
    };

    // Find restaurant by its MongoDB _id within the plan:
    const restaurant = plan.restaurants.id(restaurantId);

    // Check if restaurant exists:
    if (!restaurant) {
      return res.status(404).json({
        error: 'Restaurant not found'
      });
    }

    // Check if user has already voted for the specific restaurant within the plan by looking through the memberVotes array:
    const hasVoted = restaurant.memberVotes.find(vote => vote.username === userName);

    if (hasVoted) {
      return res.status(400).json({ error: 'User has already voted for this restaurant' });
    }

    // Add the new vote to the memberVotes array:
    const newVote = { username: userName, voteType: voteType };
    restaurant.memberVotes.push(newVote);

    // Update vote counts based on vote types:
    if (voteType === 'positive') {
      restaurant.positiveVoteCount += 1;
    } else if (voteType === 'negative') {
      restaurant.negativeVoteCount += 1;
    }

    // Update total vote count:
    restaurant.totalVoteCount += 1;

    await plan.save();

    res.json({ message: 'Vote successfully recorded', planDetails: plan});
  } catch (error) {
    console.error('Voting Error:', error);
    res.status(500).json({ error: 'Server error during voting process' });
  }
};