const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const RefreshToken = mongoose.model('RefreshToken');

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  const tokens = await RefreshToken.find().populate('user');

  res
    .status(200)
    .json({ success: true, msg: 'You are successfully authenticated to this route!', tokens });
});

module.exports = router;
