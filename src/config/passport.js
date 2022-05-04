const passport = require('passport');
const Customer = require('../models/schemas/Customer');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (customer, done) {
  console.log('Serializing user');
  done(null, customer.email);
});

passport.deserializeUser(function (email, done) {
  Customer.find({email: email})
  .then(customer => done(null, email))
  .catch(err => done(err));
});

passport.use(
  new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      console.log('Working...');
      console.log(profile);
      const customer = {
        name: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile._json.email,
        telefono: 'none'
      };
      Customer.find({email: customer.email}).then(done(null, customer))
      .catch(err => Customer.create(customer));
    }
  )
);