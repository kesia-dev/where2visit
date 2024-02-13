const express = require('express');
const usersDbQueries = require('../queries/user_query');
const router = express.Router();
const jwt = require('jsonwebtoken');

// POST User | route to create user
router.post('/api/create-user', async (req, res) => {

  usersDbQueries.setUserDbQueries(req.body)
    .then(response => {
      res.json({ response });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/api/login-user', async (req, res) => {
  try {
    const user = usersDbQueries.getUserByUsernameAndEmail(req.body);

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.userId, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'}
    );
    return res.status(200).json({ token });
  } catch(error) {
    console.log(error);
    return res.status(500).json({ message: `Error generating token: ${error}`});
  }
});

module.exports = router;
