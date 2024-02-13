const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

const checkJwt = (req, res, next) => {
  // check if there's any authorization tokens in the header
  const { authorization } = req.headers;
  console.log("We're in the checkJwt function");
  console.log("Headers: ");
  console.log(req.headers);
  console.log("authorization: ", authorization);
  // if no authorization found, or doesnt start with 'Bearer', reject immediately.
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  // get the token itself
  const token = authorization.split(' ')[1];

  jwt.verify(token, getKey, (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// jsonwebtoken getKey
const getKey = (header, callback) => {
  console.log("inside getKey");
  jwksRsa({
    jwksUri: 'https://dev-rkjah3umfq8c82at.us.auth0.com/.well-known/jwks.json',
  })(header, callback);
};

module.exports = checkJwt;
