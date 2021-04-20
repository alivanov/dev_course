const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  const users = await User.find();

  res
    .status(200)
    .json({ success: true, msg: 'You are successfully authenticated to this route!', users });
});

module.exports = router;
