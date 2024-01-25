const express = require('express');
const preferenceDbQueries = require('../../queries/preference_query');
const router = express.Router();

// POST preference | route to create prefrence
router.post('/api/preference', async (req, res) => {
  preferenceDbQueries.setPreferenceDbQueries(req.body)
  .then(response => {
    if (response && response.rows && response.rows.length > 0) {
      res.json(
        {
          respMessage: 'Successful',
          respDetail: 'Successfully created preference',
          respCode: 200,
          respData: response.rows
        }
      );
    } else {
      res.json(
        {
          respMessage: 'Successful',
          respDetail: 'Failed to create preference',
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