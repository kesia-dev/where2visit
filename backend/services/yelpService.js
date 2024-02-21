const axios = require('axios');
require('dotenv').config();
const { calculateDistance } = require('./distanceService');
const { getGoogleStaticMap, getGoogleMapsEmbedUrl } = require('./mapService');
const Restaurant = require('../models/restaurant');

const YELP_API_KEY = process.env.YELP_API_KEY;

exports.fetchYelpRestaurants = async (searchParams) => {
  const { latitude, longitude, radius, term="restaurants", categories, limit, price, minRating } = searchParams;
  // Convert categories to lower case for better results from Yelp API:   
  const lowerCaseCategories = categories.map(category => category.toLowerCase());

  try {
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: { Authorization: `Bearer ${YELP_API_KEY}` },
      params: {
        term,
        latitude,
        longitude,
        radius,
        categories: lowerCaseCategories.join(','),
        limit,
        price,
        sort_by: 'review_count',
      },
    });

    const restaurantsToSave = response.data.businesses
      .filter(restaurant => minRating === null || restaurant.rating >= minRating)
      .map( async (restaurant) => {
        const distance = calculateDistance(latitude, longitude, restaurant.coordinates.latitude, restaurant.coordinates.longitude);
        const address = `${restaurant.location.address1}, ${restaurant.location.city}, ${restaurant.location.state}, ${restaurant.location.zip_code}, ${restaurant.location.country}`;
        let restaurantDoc = await Restaurant.findOne({ yelpBusinessId: restaurant.id });
        
        if (!restaurantDoc) {
          restaurantDoc = new Restaurant({
            name: restaurant.name,
            rating: restaurant.rating,
            reviewCount: restaurant.review_count,
            photos: [{ url: restaurant.image_url }], 
            address,
            price: restaurant.price,
            yelpRestaurantUrl: restaurant.url,
            googleStaticMapUrl: getGoogleStaticMap(restaurant.coordinates.latitude, restaurant.coordinates.longitude, process.env.GOOGLE_MAPS_API_KEY),
            googleEmbedMapUrl: getGoogleMapsEmbedUrl(restaurant.name, address, process.env.GOOGLE_MAPS_API_KEY),
            yelpBusinessId: restaurant.id,
            distanceFromUser: `${distance.toFixed(2)} km`,
            categories: restaurant.categories.map(category => category.title),
            memberVotes: [],
            totalVoteCount: 0,
            positiveVoteCount: 0,
            negativeVoteCount: 0
          });
          await restaurantDoc.save();
        }
        return restaurantDoc;
      });

    // Wait for all the restaurant documents to be processed and saved:
    const savedRestaurants = await Promise.all(restaurantsToSave);

    return savedRestaurants;
    
  } catch (error) {
    console.error("Error fetching Yelp data:", error.message);
    throw error; 
  }
};
