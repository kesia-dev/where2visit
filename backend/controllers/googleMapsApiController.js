const axios = require('axios');

exports.getNearestRestaurants = async (req, res) => {
    const { location, radius, type, key } = req.query;

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${key}`;
    console.log(location, radius, type, key )
    if (!location || !radius || !type) {
        return res.status(400).json({ error: 'Missing required parameters.' });
    }
    try {
        axios.get(url)
            .then(response => {
                const results = response.data.results;

                if (results && results.length > 0) {
                    console.log('Found restaurants:');
                    results.forEach(restaurant => {
                        console.log(restaurant.name);

                        // Check if the place has photos
                        if (restaurant.photos && restaurant.photos.length > 0) {
                            console.log('Photos available:');
                            restaurant.photos.forEach(photo => {
                                const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${key}`;
                                console.log(` ${photoUrl}`);
                            });
                        } else {
                            console.log('No photos available for this place.');
                        }
                    });
                } else {
                    console.log('No restaurants found.');
                }
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
        return res.status(200).json({ message: 'Google Maps api Results' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};