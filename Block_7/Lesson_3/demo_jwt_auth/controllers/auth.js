const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../db/config.json')[process.env.NODE_ENV];

const { isValidPassword, genPasswordHash } = require('../lib/passwordUtils');

const User = mongoose.model('User');

const createToken = (userId) => {
  return jwt.sign(
    {
      userId: userId,
    },
    jwtSecret,
    { expiresIn: '3m' }, //token will expire in 3 minutes
  );
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
      res.json({ token: createToken(user.id) });
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

    res.json({ token: createToken(user.id) });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = { signIn, signUp };
