const express = require('express');
const knex = require('knex');
const session = require('express-session');
const dotenv = require('dotenv');
const knexfile = require('./knexfile');
const movieRoute = require('./routes/movies');
const authRoute = require('./routes/auth');

dotenv.config();
const db = knex(knexfile.development);

const server = express();
server.use(express.json());

server.use(session({
  name: 'White Lightning',
  secret: process.env.SESSION_SECRET,
  resave: false,
  maxAge: 3 * 24 * 60 * 60 * 1000,
  secure: false,
  saveUninitialized: true,
}));

const authorize = async (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: 'unauthorized' });
  }

  const user = await db('users')
    .where('id', req.session.userId);

  if (!user) {
    return res.status(401).json({ message: 'unauthorized' });
  }
  return next();
};

server.use('/movies', authorize, movieRoute);
server.use('/auth', authRoute);

server.listen(8000, () => {
  console.log('Listening on 8000');
});
