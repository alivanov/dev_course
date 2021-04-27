const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');

router.get('/', async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    try {
      const users = await User.find();

      res
        .status(200)
        .json({
          success: true,
          message: 'You are successfully authenticated to this route!',
          users,
        });
    } catch (err) {
      next(err);
    }
  })(req, res, next);
});

module.exports = router;
