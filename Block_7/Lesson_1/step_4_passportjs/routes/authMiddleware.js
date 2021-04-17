module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: 'You are not authorized!' });
  }
};

module.exports.isAdmin = (req, res, next) => {};
