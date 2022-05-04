const passport = require('passport');
const Customer = require('../models/schemas/Customer');
const mongoose = require('mongoose');
const customerController = require('../controllers/customer.controller');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (customer, done) {
  console.log('Serializing user');
  done(null, customer.email);
});

passport.deserializeUser(function (email, done) {
  customerController.get(email)
    .then(customer => done(null, email))
    .catch(err => done(err));
});

passport.use(
  new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log('Working...');
      const customer = {
        name: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile._json.email,
        telefono: 'none'
      };
      customerController.get(customer.email)
        .then(customer2 => done(null, customer))
        .catch(err => customerController.create(profile.name.givenName, profile.name.familyName, profile._json.email, 'none'));
    }
  )
);