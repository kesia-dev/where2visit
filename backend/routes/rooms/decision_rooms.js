const express = require('express');
const roomsDbQueries = require('../../queries/rooms_query');
const router = express.Router();

// POST decision room | route to create decision room
router.post('/api/create-room', async (req, res) => {
  roomsDbQueries.setRoomsDbQueries(req.body)
  .then(response => {
    res.json({ response });
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  });
});

// POST decision room | route to joining decision room
router.post('/api/join-room', async (req, res) => {
  roomsDbQueries.joinRoomsDbQueries(req.body)
  .then(response => {
    res.json({ response });
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  });
});

module.exports = router;