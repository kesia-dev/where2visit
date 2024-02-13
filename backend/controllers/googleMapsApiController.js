const axios = require('axios');
require('dotenv').config();
const { filterRestaurants } = require('../services/restaurantFilterService');

// Function to get the nearest restaurants from the Google Maps Places API:
exports.getNearestRestaurants = async (req, res) => {
    // Destructure the query parameters:
    const { keyword, location, radius, type } = req.query;
    // Destructure the filters from the query parameters:
    const filters = {
        numberOfRestaurants: req.query.numberOfRestaurants,
        starRating: req.query.starRating,
        priceRange: req.query.priceRange
    };
    // Get the Google Maps API key from the environment variables:
    const key = process.env.GOOGLE_MAPS_API_KEY;
    // Set a baseUrl for the Google Maps Places API to make the request url more readable:
    const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    // Construct the url with the query parameters:
    const url = `${baseUrl}?keyword=${keyword}&location=${location}&radius=${radius}&type=${type}&key=${key}`;
    console.log(
        "Keyword is: ", keyword, "\n",
        "Location is: ", location, "\n",
        "Radius is of: ", radius, "\n",
        "Type is: ", type, "\n",
        "Star rating is: ", filters.starRating, "\n",
        "Price range is: ", filters.priceRange, "\n",
        "Number of restaurants is: ", filters.numberOfRestaurants, "\n",
    );
    // If any of the required parameters are missing, return an error:
    if (!keyword || !location || !radius || !type) {
        return res.status(400).json({ error: 'Missing required parameters.' });
    }
    // Get request to get response data from Google Maps Places API:
    try {
        const response = await axios.get(url);
        const results = response.data.results;
        // Filter the restaurants results based on the user's preferences using the service function:
        const filteredResults = filterRestaurants(results, filters);
        // If there are results, log the names of the restaurants and their photos:
        if (filteredResults && filteredResults.length > 0) {
            console.log(`Found ${filteredResults.length} restaurants: ` + '\n');
            filteredResults.forEach((restaurant, restaurantIndex) => {
                console.log(`${restaurantIndex + 1}: ${restaurant.name} - Rating: ${restaurant.rating || 'N/A'}, Price Level: ${restaurant.price_level || 'N/A'}`);
                // Check if the place has photos:
                if (restaurant.photos && restaurant.photos.length > 0) {
                    console.log('Photos available: ');
                    restaurant.photos.forEach(photo => {
                        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${key}`;
                        console.log(`${photoUrl}`+ '\n');
                    });
                } else {
                    console.log('No photos available for this place.');
                }
            });
        } else {
            console.log('No restaurants found.');
        }
        // Return the results as JSON:
        return res.status(200).json({ results: filteredResults });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

};