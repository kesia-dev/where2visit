const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    }
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
    reviewCount: {
        type: Number,
        default: null,
    },
    photos: [photoSchema],
    address: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        default: null,
    },
    yelpRestaurantUrl: {
        type: String,
        required: false,
    },
    googleStaticMapUrl: {
        type: String,
        required: false,
    },
    googleEmbedMapUrl: {
        type: String,
        required: false,
    },
    yelpBusinessId: {
        type: String,
        required: true,
    },
    distanceFromUser: {
        type: String, 
        required: false, 
    },
    categories: [{
        type: String, 
        required: true,
    }],
    voteCount: {
        type: Number,
        default: 0
    },
    positiveVotes: {
        type: [String],
        required: true
    },
    negativeVotes: {
        type: [String],
        required: true
    }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = { restaurantSchema, Restaurant };
