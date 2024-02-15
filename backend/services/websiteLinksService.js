const axios = require('axios');

/**
 * Fetches the official website of a restaurant using the Google Places API.
 * @param {string} placeId The Google Place ID of the restaurant.
 * @param {string} key Our Google API key.
 * @returns {Promise<string>} A promise that resolves to the website URL, rejects if an error occurs or null if the website is not found.
 */
exports.fetchRestaurantWebsite = async (placeId, key) => {
    const baseUrl = `https://maps.googleapis.com/maps/api/place/details/json`;
    const url = `${baseUrl}?placeid=${placeId}&fields=website&key=${key}`
    try {
        const response = await axios.get(url);
        if (response.data && response.data.result && response.data.result.website) {
            return response.data.result.website;
        }
    } catch (error) {
        console.error('Error fetching restaurant website:', error);
    }
    return null;
};

