const mongoose = require('mongoose');

// Schema for member votes
const memberVoteSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  voteType: {
    type: String,
    required: true,
    enum: ['positive', 'negative']
  }
});

module.exports = { memberVoteSchema };
