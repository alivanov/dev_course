const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send("<h1>I'm a public route</h1>");
});

router.use('/users', require('./users'));
router.use('/auth', require('./auth'));
router.use('/refresh-tokens', require('./refresh-tokens'));

module.exports = router;
