require("dotenv").config();
const db = require('../connection');

// query to create user
const setUserDbQueries = async (params) => {
  const getUsername = params.username;
  const getEmail = params.email;

  try {
    const postRelationQuery = {
      text: 'INSERT INTO users ( username, email ) VALUES ( $1, $2 ) RETURNING id',
      values: [getUsername, getEmail],
    };

    return await db.query(postRelationQuery);

  } catch (error) {
    throw error;
  }
};

// query to get user by id
const getUserByIdQueries = (userId) => {
  try {
    
    const selectRelationQuery = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [userId],
    };

    const resultUser = db.query(selectRelationQuery);

    return resultUser;

  } catch (error) {
    throw error;
  }
};

module.exports = { setUserDbQueries, getUserByIdQueries };