const express = require('express');
const categoriesDbQueries = require('../../queries/category_query');
const router = express.Router();

// GET all categories | route to select categories
router.get('/api/categories', async (req, res) => {
  categoriesDbQueries.getCategoryDbQuery(req.body)
  .then(response => {
    if (response && response.rows && response.rows.length > 0) {
      res.json(
        {
          respMessage: 'Successful',
          respDetail: 'Successfully fetched categories',
          respCode: 200,
          respData: response.rows
        }
      );
    } else {
      res.json(
        {
          respMessage: 'Successful',
          respDetail: 'No data available',
          respCode: 404,
          respData: response.rows
        }
      )
    }
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  });
});

module.exports = router;