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
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = { restaurantSchema, Restaurant };
