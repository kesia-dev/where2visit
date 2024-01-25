require("dotenv").config();
const db = require('../connection');

const getCategoryDbQuery = async () => {
  try {
    const getCategoryQuery = {
      text: 'SELECT * FROM Categories WHERE is_active = $1',
      values: [true]
    };

    return await db.query(getCategoryQuery);
  } catch (error) {
    throw error;
  }
};

module.exports = { getCategoryDbQuery };