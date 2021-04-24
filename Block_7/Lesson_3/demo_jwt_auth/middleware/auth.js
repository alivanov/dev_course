const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../db/config.json')[process.env.NODE_ENV];

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided!' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const data = jwt.verify(token, jwtSecret);
    console.log('data decrypted', data);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token!' });
    }
  }

  next();
};
