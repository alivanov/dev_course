require('dotenv').config();
const { VK_APP_ID, VK_SECURE_KEY, GOOGLE_APP_ID, GOOGLE_SECURE_KEY } = process.env;

module.exports = {
  vkontakteAuth: {
    clientID: VK_APP_ID,
    clientSecret: VK_SECURE_KEY,
    callbackURL: '/registration/vk/callback'
  },
  googleAuth: {
    clientID: GOOGLE_APP_ID,
    clientSecret: GOOGLE_SECURE_KEY,
    callbackURL: '/registration/google/callback'
  }
};