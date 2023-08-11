const LocalStrategy = require('passport-local').Strategy;


function initialize(passport) {
    // Serialize the user to store in the session (in this case, we'll just store the email)
    passport.serializeUser((user, done) => done(null, user.email));
  
    // Deserialize the user from the session (in this case, we don't need to access user details)
    passport.deserializeUser((email, done) => done(null, { email }));
  }
  
  module.exports = initialize;
  

module.exports = initialize;
