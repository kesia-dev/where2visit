const limitMapping = {
    "3": 3,
    "5": 5,
    "10": 10,
    "15+": 50,
};

const priceRangeMapping = {
    "<50": "1",
    "50-100": "2",
    "100-150": "3",
    "150+": "4",
};

const ratingMapping = {
    "any": null,
    "3+": 3,
    "4+": 4,
    "5": 5,
};

exports.yelpFilterRestaurants = ({ numberOfRestaurants, priceRange, rating }) => {
    // Default to 20 if not specified:
    const limit = limitMapping[numberOfRestaurants] || 20;
    // The frontend would send values like "<50", "50-100", etc.:
    const price = priceRangeMapping[priceRange]; 
    // Ratings are obtained after fetching the results, so we only need to convert the user's selection to a numerical value:
    const minRating = ratingMapping[rating];

    return {
        limit,
        price,
        minRating,
    };
};