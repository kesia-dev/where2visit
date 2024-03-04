const { mongoose } = require("mongoose");
const { restaurantSchema } = require('./restaurant');

const createPlanSchema = new mongoose.Schema({
    planName: {
        type: String,
        required: true,
    },
    hostName: {
        type: String,
        required: true,
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
        required: false,
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
    participants: [{
        username: String,
        isHost: {
            type: Boolean,
            default: false,
        }
    }],
    restaurants: [restaurantSchema],
    isActive: {
        type: Boolean,
        default: true,
    },
    roomId: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Create-Plan', createPlanSchema);
