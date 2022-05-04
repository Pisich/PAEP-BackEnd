const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const authRoute = require('./routes/auth.route');
const YAML = require('yamljs');
const cors = require('cors');

require('dotenv').config();
require('./config/db');
require('./config/passport');

const uploadRoute = require('./routes/upload.route');
const {NotFoundError} = require('./utils/errors');

const app = express();
const swaggerDocument = YAML.load('src/docs/swagger.yaml');

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['clave'] //clave para encriptar
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoute);
app.use('/upload', uploadRoute);

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.get('/uploader', (req, res) => {
  res.redirect('/public/html/uploader.html');
});


app.use((err, req, res, next) => {
  console.log('Error', err);
  if (err.details) return res.status(400).send(err.details[0].message);
  if (err instanceof NotFoundError) {
    return res.status(404).send(err.message);
  }
  res.status(503).send('[Generic Error] Something went wrong!');
});

module.exports = app;
