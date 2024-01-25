require("dotenv").config();
const db = require('../connection');

// query to create result
const setResultsDbQueries = async (params) => {
  const getNoOfResults = params.noOfResults;
  const getNoOfRestaurants = params.noOfRestaurants;
  const getEvantsId = params.evantsId;

  try {
    const postResultQuery = {
      text: 'INSERT INTO Results ( noOfResults, noOfRestaurants, evantsId) VALUES ( $1, $2, $3 ) RETURNING id',
      values: [getNoOfResults, getNoOfRestaurants, getEvantsId],
    };

    return await db.query(postResultQuery);

  } catch (error) {
    throw error;
  }
};

module.exports = { setResultsDbQueries };