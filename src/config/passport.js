const passport = require('passport');
const Users = require('../models/schemas/Users');
const mongoose = require('mongoose');
const userController = require('../controllers/user.controller');
const { NotFoundError } = require('../utils/errors');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {
  console.log('Serializing user');
  done(null, user.email);
});

passport.deserializeUser(function (email, done) {
  userController.getByEmail(email)
    .then(user => done(null, email))
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
      const user = {
        name: profile.name.givenName,
        lastname: profile.name.familyName,
        email: profile._json.email,
        puesto: 'Puesto nulo',
        descripcion: 'Desc nula',
        imgLink: profile._json.picture,
        active: true
      };
      let userC;
      let userE;
      try {
        userC = await userController.getByEmail(user.email);
        console.log('Existing user');
      } catch (NotFoundError) {
        console.log('Creating user');
        userE = await userController.create(profile.name.givenName,
        profile.name.familyName, 'Desc nula', 'Puesto Nulo', profile._json.picture, profile._json.email);
        console.log("userE", userE);
      }
      done(null, user);
    }
  )
);