const axios = require('axios');
require('dotenv').config();

const YELP_API_KEY = process.env.YELP_API_KEY;

// This function fetches the details of a business from the Yelp API:
exports.fetchYelpBusinessDetails = async (req, res) => {
    // Yelp business ID from the route parameter:
    const { id } = req.params;

    try {
        const response = await axios.get(`https://api.yelp.com/v3/businesses/${id}`, {
            headers: { Authorization: `Bearer ${YELP_API_KEY}` },
        });

        const businessDetails = response.data;
        // These details will be sent to the frontend:
        const details = {
            name: businessDetails.name,
            // It is an array of three photos URLs of the restaurant:
            photos: businessDetails.photos,
            // The restaurant's yelp page URL:
            business_url: businessDetails.url
        };
        console.log(
            "The restaurant name is: ", details.name, "\n",
            "Business URL is: ", details.business_url, "\n"
        );
        businessDetails.photos.forEach((photo, index) => {
            console.log(`Photo ${index + 1}: ${photo}`);
        });
        const dataForFrontend = {
            name: details.name,
            photos: details.photos,
            business_url: details.business_url
        };
        res.status(200).json(dataForFrontend);
    } catch (error) {
        console.error("Failed to fetch Yelp business details:", error);
        res.status(500).json({ error: error.message });
    }
};