// restaurant.js
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
});

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: null,
    },
    photos: {
        type: [photoSchema],
        default: [],
    },
    voteCount: {
        type: Number,
        default: 0
    },
    positiveVotes:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    negativeVotes:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = { restaurantSchema, Restaurant };
