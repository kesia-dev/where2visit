// The following are functions that calculate the distance between two points on the Earth and convert degrees to radians. 
// The purpose of these functions is to use them to calculate users location from the restaurants address in kilometers.
// The Harversine formula is used to calculate the distance between two points on the Earth using their latitude and longitude coordinates. I found the formula on https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript

/** 
 * Calculates the great-circle distance between two points on the Earth.
 * @param {number} lat1 Latitude of the first point.
 * @param {number} lon1 Longitude of the first point.
 * @param {number} lat2 Latitude of the second point.
 * @param {number} lon2 Longitude of the second point.
 * @returns {number} The distance between the two points in kilometers.
 */
exports.calculateDistance = (lat1, lon1, lat2, lon2) => {
    // const R is the radius of the Earth in kilometers:    
    const R = 6371; 
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * Converts degrees to radians.
 * @param {number} degrees
 * @returns {number} The equivalent in radians.
 */
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}
