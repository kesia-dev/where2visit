const { mongoose } = require("mongoose");
const { restaurantSchema } = require('./restaurant');

const createPlanSchema = new mongoose.Schema({
    planName: {
        type: String,
        required: true,
        unique: true,
    },
    hostName: {
        type: String,
        required: true,
        unique: true,
    },
    dateOfEvent: {
        type: Date,
        required: true,
    },
    timeOfEvent: {
        type: String,
        required: true,
    },
    location: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
    radius: {
        type: Number,
        required: true,
    },
    cuisine: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    priceRange: {
        type: String,
        required: true,
    },
    numberOfResults: {
        type: Number,
        required: true,
    },
    numberOfMatches: {
        type: Number,
        required: true,
    },
    restaurants: [restaurantSchema],
    roomId: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Create-Plan', createPlanSchema);
