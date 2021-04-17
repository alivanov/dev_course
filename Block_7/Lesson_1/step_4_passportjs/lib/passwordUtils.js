const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const isValidPassword = async (password, hash) => {
  const hashVerify = await genPasswordHash(password);

  return await bcrypt.compare(hashVerify, hash);
};
const genPasswordHash = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

module.exports = {
  isValidPassword,
  genPasswordHash,
};
