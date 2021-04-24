const jwt = require("jsonwebtoken");
const uuid = require("uuid").v4;
const { secret, tokens } = require("../db/config.json")[
  process.env.NODE_ENV
].jwt;

const mongoose = require("mongoose");
const Token = mongoose.model("Token");

const generateAccessToken = (userId) => {
  const payload = {
    userId,
    type: tokens.access.type,
  };

  const options = { expiresIn: tokens.access.expiresIn };

  return jwt.sign(payload, secret, options);
};

const generateRefreshToken = () => {
  const payload = {
    id: uuid(),
    type: tokens.refresh.type,
  };

  const options = { expiresIn: tokens.refresh.expiresIn };

  return {
    id: payload.id,
    token: jwt.sign(payload, secret, options),
  };
};

const replaceDbRefreshToken = (tokenId, userId) => {
  return Token.findOneAndRemove({ userId }).then(() => {
    Token.create({ tokenId, userId });
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  replaceDbRefreshToken,
};
