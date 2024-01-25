const express = require('express');
const roomsDbQueries = require('../queries/user_query');
const router = express.Router();

// POST User | route to create user
router.post('/api/create-user', async (req, res) => {

  roomsDbQueries.setUserDbQueries(req.body)
    .then(data => {
      if (data && data.rows && data.rows.length > 0) {
        res.json(
          {
            respMessage: 'Successful',
            respDetail: 'User created successfully',
            respCode: 200,
            respData: data.rows[0]
          }
        );
      } else {
        throw new Error('Data not found or format invalid');
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
