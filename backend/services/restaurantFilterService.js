/**
 * This service is responsible for filtering the restaurants based on the user's preferences.
 * @param {Array} restaurants - The array of restaurants to be filtered.
 * @param {Object} filters - The user's preferences for the restaurants.
 * @returns {Array} - The filtered array of restaurants.
 */

exports.filterRestaurants = (restaurants, { numberOfRestaurants, starRating, priceRange }) => {
  // The google maps places API returns 20 restaurants by default.
  // Determine number of restaurants to return based on user selection on the frontend:
  const restaurantsMapping = { '3': 3, '5': 5, '10': 10, '15+': 20 };
  // If the user selects a number of restaurants, use the mapping to determine the max number of restaurants to return. Otherwise, return 20 by default:
  const maxNumberOfRestaurants = numberOfRestaurants ? restaurantsMapping[numberOfRestaurants] : 20;
  
  // Ratings and price levels are numerical values when retrieved from the Google Maps Places API.
  // Price levels are represented as integers from 0 to 4, where 0 is free and 4 is very expensive.
  // Ratings are represented as floating point numbers from 1.0 to 5.0.
  // starRating and priceRange are expected to be parameters passed from the frontend.
  // Convert starRating and priceRange to numerical values for comparison:
  // If for instance, the user selects rating 4+, the starRating will be "4+"" and we need to extract the number 4 from the string. Otherwise, return null which disables the ratings filter:
  const ratingThreshold = starRating ? parseInt(starRating[0]) : null; 
  const priceLevelMap = { "<50": 1, "50-100": 2, "100-150": 3, "150+": 4 };
  // If the user selects a price range, use the mapping to determine the price level threshold:
  const priceLevelThreshold = priceRange ? priceLevelMap[priceRange] : null;

  let filteredRestaurants = restaurants.filter(restaurant => {
    // If the user selects a rating, only return restaurants that meet the rating threshold. Otherwise, return all restaurants:
    const meetsRating = ratingThreshold ? restaurant.rating >= ratingThreshold : true;
    // If the user selects a price range, only return restaurants that meet the price level threshold or lower. Otherwise, return all restaurants:
    const meetsPriceLevel = priceLevelThreshold !== null ? restaurant.price_level <= priceLevelThreshold : true;
    return meetsRating && meetsPriceLevel;
  });

  // Sort the restaurants based on the user's ratings count from highest to lowest. This is to ensure that the restaurants with the highest ratings count are returned first:
  filteredRestaurants.sort((a, b) => b.user_ratings_total - a.user_ratings_total);

  // If the user selects a number of restaurants, return the number of restaurants based on the user's selection. Otherwise, return the default number of restaurants:
  if (numberOfRestaurants) {
    filteredRestaurants = filteredRestaurants.slice(0, maxNumberOfRestaurants);
  }

  return filteredRestaurants;
};