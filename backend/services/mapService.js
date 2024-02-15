/**
 * A service function to get the URL of the Google Static Map for a restaurant.
 * @param {number} restaurantLat 
 * @param {number} restaurantLng 
 * @param {string} key 
 * @returns {string} The URL of the Google Static Map for the restaurant.
 */
exports.getGoogleStaticMap = (restaurantLat, restaurantLng, key) => {
    // Basic validation of input parameters:
    if (!restaurantLat || !restaurantLng || !key) {
        console.error('Invalid parameters for generating Google Static Map URL.');
        return null; 
    }
    // Set a baseUrl for the Google Maps Static API to make the request url more readable:
    const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
    // Construct the url with the query parameters:
    const params = new URLSearchParams({
        center: `${restaurantLat},${restaurantLng}`,
        zoom: "20",
        size: "600x300",
        maptype: "roadmap",
        markers: `color:red|label:S|${restaurantLat},${restaurantLng}`,
        key
    });
    const url = `${baseUrl}?${params.toString()}`;
    return url;
};
