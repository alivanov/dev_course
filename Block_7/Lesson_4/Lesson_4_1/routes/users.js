const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');

router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const users = await User.find().populate('refreshTokens');

    res
      .status(200)
      .json({ success: true, msg: 'You are successfully authenticated to this route!', users });
  },
);

module.exports = router;
