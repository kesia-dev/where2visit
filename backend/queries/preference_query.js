require("dotenv").config();
const db = require('../connection');

// query to create preferences
const setPreferenceDbQueries = async (params) => {
  // check category type
  if (params.categoryId === 1) {
    const getEventId = params.eventId;
    const getCuisine = params.cuisine;
    const getDietaryRes = params.dieteryRestriction;
    const getPriceRange = params.priceRange;
    const getRating = params.rating;

    try {
      const postRestRelationQuery = {
        text: 'INSERT INTO RestaurantPref ( eventId, cuisine, dietaryrestriction, pricerange, rating) VALUES ( $1, $2, $3, $4, $5 ) RETURNING id',
        values: [getEventId, getCuisine, getDietaryRes, getPriceRange, getRating],
      };

      return await db.query(postRestRelationQuery);

    } catch (error) {
      throw error;
    }
  }
};

module.exports = { setPreferenceDbQueries };