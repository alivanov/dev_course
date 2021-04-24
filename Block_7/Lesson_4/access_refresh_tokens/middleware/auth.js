const jwt = require("jsonwebtoken");
const { secret } = require("../db/config.json")[process.env.NODE_ENV].jwt;

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Token not provided!" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, secret);
    if (payload.type !== "access") {
      return res.status(401).json({ message: "Invalid token!" });
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired!" });
    }

    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token!" });
    }
  }

  next();
};
