const express = require('express');
const resultDbQueries = require('../../queries/result_query');
const router = express.Router();

// POST result | route to create result
router.post('/api/create-result', async (req, res) => {
  resultDbQueries.setResultsDbQueries(req.body)
    .then(response => {
      if (response && response.rows && response.rows.length > 0) {
        res.json(
          {
            respMessage: 'Successful',
            respDetail: 'Successfully created event',
            respCode: 200,
            respData: response.rows[0]
          }
        );
      } else {
        res.json(
          {
            respMessage: 'Successful',
            respDetail: 'Failed to create result',
            respCode: 404,
            respData: response.rows[0]
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