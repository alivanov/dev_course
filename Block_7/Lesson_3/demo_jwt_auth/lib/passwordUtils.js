//https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const isValidPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
const genPasswordHash = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

module.exports = {
  isValidPassword,
  genPasswordHash,
};
