require("dotenv").config();
const db = require('../connection');

// query to create event
const setEventDbQueries = async (params) => {
  const getPlanName = params.planName;
  const getHostName = params.hostName;
  const getDateTimeOfEvent = params.dateTimeOfEvent;
  const getDateCreated = new Date();
  const getCategoryId = params.categoryId;
  const getEventLocation  = params.eventLocation;

  try {
    const postRelationQuery = {
      text: 'INSERT INTO Events ( planName, hostName, dateTimeOfEvent, dateCreated, categoryId, eventLocation) VALUES ( $1, $2, $3, $4, $5, $6 ) RETURNING id',
      values: [getPlanName, getHostName, getDateTimeOfEvent, getDateCreated, getCategoryId, getEventLocation],
    };

    return await db.query(postRelationQuery);

  } catch (error) {
    throw error;
  }
};

module.exports = { setEventDbQueries };