const axios = require('axios');
require('dotenv').config();
const { filterRestaurants } = require('../services/restaurantFilterService');
const { calculateDistance } = require('../services/distanceService');
const { fetchRestaurantWebsite } = require('../services/websiteLinksService');
const { getGoogleStaticMap } = require('../services/mapService');

// Function to get the nearest restaurants from the Google Maps Places API:
exports.getNearestRestaurants = async (req, res) => {
    // Destructure the query parameters:
    const { keyword, location, radius, type } = req.query;
    // Split user's location into latitude and longitude and convert them to numbers:
    const [userLat, userLng] = location.split(',').map(Number);
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
        // Map over the results and calculate the distance between the user's location and the restaurant's location:
        const resultsWithRestaurantsDetails = await Promise.all(results.map( async (restaurant) => {
            const website = await fetchRestaurantWebsite(restaurant.place_id, key);
            const staticMapUrl = getGoogleStaticMap(restaurant.geometry.location.lat, restaurant.geometry.location.lng, key);
            
            return {
                ...restaurant,
                website,
                staticMapUrl,
                distance: calculateDistance(userLat, userLng, restaurant.geometry.location.lat, restaurant.geometry.location.lng)
            };
        }));
        // Filter the restaurants results based on the user's preferences using the service function:
        const filteredResults = filterRestaurants(resultsWithRestaurantsDetails, filters);
        // If there are results, log the names of the restaurants and their photos:
        if (filteredResults && filteredResults.length > 0) {
            console.log(`Found ${filteredResults.length} restaurants: ` + '\n');
            filteredResults.forEach((restaurant, restaurantIndex) => {
                console.log(`${restaurantIndex + 1}: ${restaurant.name}\n` +
                `Rating: ${restaurant.rating || 'N/A'}\n` + 
                `Price Level: ${restaurant.price_level || 'N/A'}\n` +
                `Address: ${restaurant.vicinity || 'N/A'}\n` +
                `Map URL: ${restaurant.staticMapUrl || 'N/A'}\n` +
                `Website: ${restaurant.website || 'N/A'}\n` +
                `Distance from you: ${restaurant.distance.toFixed(2)} km\n` +
                `Ratings Count: ${restaurant.user_ratings_total || 'N/A'}\n`
                );
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