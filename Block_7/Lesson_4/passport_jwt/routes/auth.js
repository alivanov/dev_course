const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');
const RefreshToken = mongoose.model('RefreshToken');

const utils = require('../lib/utils');

const issueTokensPair = async (userId) => {
  try {
    const newRefreshToken = new RefreshToken({
      user: userId,
      token: utils.issueRefreshToken(),
    });

    const refreshToken = await newRefreshToken.save();
    const tokenObject = utils.issueJWT(userId);

    return {
      token: tokenObject.token,
      expiresIn: tokenObject.expiresIn,
      refresh: refreshToken,
    };
  } catch (e) {
    console.log(e);
  }
};

router.post('/refresh', async (req, res, next) => {
  const { refreshToken } = req.body;

  try {
    const refreshTokenData = await RefreshToken.findOne({ token: refreshToken });
    if (!refreshTokenData) {
      return res.status(404).json({
        message: 'Refresh token not found',
      });
    }

    if (!utils.verifyRefreshToken(refreshTokenData.token)) {
      return res.status(401).json({ message: 'Invalid refresh token or token expired!' });
    }

    await RefreshToken.deleteOne({ token: refreshToken });

    const tokenPair = await issueTokensPair(refreshTokenData.user);

    res.status(200).json({
      success: true,
      ...tokenPair,
    });
  } catch (err) {
    next(err);
  }
});

// Validate an existing user and issue a JWT
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ success: false, msg: 'could not find user' });
    }

    const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

    if (isValid) {
      const tokenPair = await issueTokensPair(user._id);

      res.status(200).json({
        success: true,
        ...tokenPair,
      });
    } else {
      res.status(401).json({ success: false, msg: 'you entered the wrong password' });
    }
  } catch (err) {
    next(err);
  }
});

// Register a new user
router.post('/register', async (req, res, next) => {
  try {
    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
      username: req.body.username,
      hash: hash,
      salt: salt,
    });

    const user = await newUser.save();
    const tokenPair = await issueTokensPair(user._id);

    res.status(200).json({
      success: true,
      ...tokenPair,
    });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
});

router.post('/logout', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (user || info.user) {
      // both access & refresh tokens expired :(
      const id = user._id || info.user._id;

      try {
        await RefreshToken.deleteMany({ user: id });

        res.status(200).json({
          success: true,
        });
      } catch (err) {
        next(err);
      }
    } else {
      return res.status(401).json({ message: info });
    }
  })(req, res, next);
});

module.exports = router;
