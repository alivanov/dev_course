const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const authHelper = require('../helpres/authHelper');

const { secret } = require('../db/config.json')[process.env.NODE_ENV].jwt;

const { isValidPassword, genPasswordHash } = require('./lib/passwordUtils');

const User = mongoose.model('User');
const Token = mongoose.model('Token');

const updateTokens = (userId) => {
  const accessToken = authHelper.generateAccessToken(userId);
  const refreshToken = authHelper.generateRefreshToken();

  return authHelper.replaceDbRefreshToken(refreshToken.id, userId).then(() => {
    return {
      accessToken,
      refreshToken,
    };
  });
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Users does not exist!' });
    }

    const isValid = await isValidPassword(password, user.password);

    if (isValid) {
      updateTokens(user.id).then((tokens) => res.json(tokens));
    } else {
      res.status(401).json({ message: 'Invalid credentials!' });
    }
  } catch (e) {
    next(e);
  }
};

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const neweUser = new User({
      email: email,
      password: await genPasswordHash(password),
    });

    const user = await neweUser.save();

    updateTokens(user.id).then((tokens) => res.json(tokens));
  } catch (e) {
    next(e);
  }
};

const refreshTokens = (req, res, next) => {
  const { refreshToken } = req.body;
  let payload;

  try {
    payload = jwt.verify(refreshToken, secret);

    if (payload.type !== 'refresh') {
      return res.status(400).json({ message: 'Invalid token!' });
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(400).json({ message: 'Token expired!' });
    }

    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ message: 'Invalid token!' });
    }
  }

  Token.findOne({ tokenId: payload.id })
    .then((token) => {
      if (token === null) {
        return next(new Error('Invalid token!'));
      }

      return updateTokens(token.userId);
    })
    .then((tokens) => res.json(tokens));
};

module.exports = { signIn, signUp, refreshTokens };
