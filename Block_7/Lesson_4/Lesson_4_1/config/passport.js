const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');
const User = require('mongoose').model('User');

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //'Authorization' header is expected in the format: 'Bearer <access_token>'
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
  //https://github.com/mikenicholson/passport-jwt/issues/191
  ignoreExpiration: false,
};

// index.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
  // The JWT payload is passed into the verify callback
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      console.log(jwt_payload);

      // We will assign the `sub` property on the JWT to the database ID of user
      User.findOne({ _id: jwt_payload.sub }, (err, user) => {
        // This flow look familiar?  It is the same as when we implemented
        // the `passport-local` strategy
        if (err) {
          return done(err, false);
        }

        if (user) {
          //https://github.com/mikenicholson/passport-jwt/issues/191
          if (Date.now() > jwt_payload.exp) {
            return done(null, false, { message: 'token expired!' });
          }

          return done(null, user);
        } else {
          return done(null, false, { message: 'User not found' });
        }
      });
    }),
  );
};
