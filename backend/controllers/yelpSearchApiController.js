const axios = require('axios');
require('dotenv').config();
const { yelpFilterRestaurants } = require('../services/yelpRestaurantsFilterService');
const { calculateDistance } = require('../services/distanceService');
const { getGoogleStaticMap } = require('../services/mapService');

const YELP_API_KEY = process.env.YELP_API_KEY;

const yelpBusinessSearchURL = 'https://api.yelp.com/v3/businesses/search';

exports.getYelpNearestRestaurants = async (req, res) => {
    const { term, latitude: userLat, longitude: userLng, radius, categories }= req.body;
    const filterParams = yelpFilterRestaurants({
        numberOfRestaurants: req.body.numberOfRestaurants,
        priceRange: req.body.priceRange,
        rating: req.body.rating
    });
    console.log(
        "Term is: ", term, "\n",
        "User's latitude is: ", userLat, "\n",
        "User's longitude is: ", userLng, "\n",
        "Radius is of: ", radius, "\n",
        "Categories are: ", categories, "\n",
        "Limit is: ", filterParams.limit, "\n",
        "Price Range is: ", filterParams.price, "\n",
        "Minimum Rating is: ", filterParams.minRating, "\n"
    );
    try {
        const response = await axios.get(yelpBusinessSearchURL, {
            headers: {
                Authorization: `Bearer ${YELP_API_KEY}`
            },
            params: {
                term,
                latitude: userLat,
                longitude: userLng,
                radius,
                categories,
                price: filterParams.price,
                limit: filterParams.limit,
                sort_by: 'review_count',
            },
        });

        let results = response.data.businesses
            .filter(restaurant => filterParams.minRating === null || restaurant.rating >= filterParams.minRating)
            .map(restaurant => {
                const restaurantLat = restaurant.coordinates.latitude;
                const restaurantLng = restaurant.coordinates.longitude;
                const distance = calculateDistance(userLat, userLng, restaurantLat, restaurantLng);
                const googleStaticMapUrl = getGoogleStaticMap(restaurantLat, restaurantLng, process.env.GOOGLE_MAPS_API_KEY);
                const restaurantCategories = restaurant.categories.map(category => category.title);

                return { 
                    id: restaurant.id,
                    name: restaurant.name,
                    mainImage_url: restaurant.image_url,
                    googleStaticMapUrl,
                    rating: restaurant.rating,
                    review_count: restaurant.review_count,
                    price: restaurant.price,
                    categories: restaurantCategories,
                    location: restaurant.location.address1,
                    city: restaurant.location.city,
                    distance: `${distance.toFixed(2)} km`,
                    restaurantUrl: restaurant.url
                };
            });

        console.log(`Found ${results.length} restaurants:`);
        results.forEach((restaurant, index) => {
            console.log(
                `Restaurant ${index + 1}: ${restaurant.name}\n` +
                `- Restaurant ID: ${restaurant.id}\n` +
                `- Rating: ${restaurant.rating}\n` +
                `- Review Count: ${restaurant.review_count}\n` +
                `- Price Level: ${restaurant.price || 'N/A'}\n` +
                `- Categories: ${restaurant.categories.join(', ')}\n` +
                `- Address: ${restaurant.location}, ${restaurant.city}\n` +
                `- Distance From You: ${restaurant.distance}\n` +
                `- Restaurant Image URL: ${restaurant.image_url}\n` +
                `- Yelp Restaurant URL: ${restaurant.restaurantUrl}\n` +
                `- Google Static Map URL: ${restaurant.googleStaticMapUrl}\n`
            );
        });
        // Return the results as JSON to the frontend in a structural format.
        // Search MetaData provides information about the search that was performed.
        // Restaurants is an array of objects containing the restaurant's details:
        res.status(200).json({
            searchMetadata: {
                term: term,
                latitude: userLat,
                longitude: userLng,
                radius: radius,
                categories: categories,
                limit: filterParams.limit,
                priceRange: filterParams.price,
                minRating: filterParams.minRating,
                totalResults: results.length
            },
            restaurants: results.map(restaurant => ({
                id: restaurant.id,
                name: restaurant.name,
                mainImage_url: restaurant.image_url,
                rating: restaurant.rating,
                review_count: restaurant.review_count,
                price: restaurant.price,
                categories: restaurant.categories,
                restaurantUrl: restaurant.restaurantUrl,
                location: { 
                    address: restaurant.location.address1,
                    city: restaurant.location.city,
                    latitude: restaurant.restaurantLat,
                    longitude: restaurant.restaurantLng,
                    distance: restaurant.distance
                },
            }))
        });
    } catch (error) {
        console.error("Yelp API error: ", error);
        res.status(500).json({ error: 'Failed to fetch data from Yelp API.' });
    }

};