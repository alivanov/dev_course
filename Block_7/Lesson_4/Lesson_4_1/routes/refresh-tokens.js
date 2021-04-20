const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const RefreshToken = mongoose.model('RefreshToken');

router.get('/', async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json(info);
    }

    try {
      const tokens = await RefreshToken.find().populate('user');

      res
        .status(200)
        .json({ success: true, msg: 'You are successfully authenticated to this route!', tokens });
    } catch (err) {
      next(err);
    }
  })(req, res, next);
});

module.exports = router;
