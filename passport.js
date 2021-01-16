const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "823136671916-sf2jadrsssthoppu8lq9bdvo73r9c6en.apps.googleusercontent.com",
    clientSecret: "FuTZATXnlsuliQswDJj1KV-w",
    callbackURL: 'http://localhost:8080/user-feed'
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));