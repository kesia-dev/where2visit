const express = require('express');
const roomsDbQueries = require('../../queries/event_query');
const router = express.Router();

// POST event | route to create event
router.post('/api/create-event', async (req, res) => {
  roomsDbQueries.setEventDbQueries(req.body)
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
            respDetail: 'Failed to create event',
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