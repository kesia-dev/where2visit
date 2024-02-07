const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET;

// Middleware to validate the token
const validateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'No token found, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), TOKEN_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token, authorization denied' });
  }
};

module.exports = validateToken;