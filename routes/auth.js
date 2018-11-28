const express = require('express');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const knexfile = require('../knexfile');


const db = knex(knexfile.development);

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Include all fields' });
  }
  const hash = bcrypt.hashSync(password, 12); 
  try {
    const [id] = await db('users').insert({ username, hash });
    if (!id) {
      throw new Error('no id returned');
    }
    return res.status(201).json({ username, id });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Include all fields' });
  }
  try {
    const userInfo = await db('users').where('username', username).first();
    if (!userInfo || !bcrypt.compareSync(password, userInfo.hash)) {
      return res.status(403).json({ message: 'Failed to authenticate' });
    }
    req.session.userId = userInfo.id;
    return res.status(200).json({ username: userInfo.username, id: userInfo.id });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

router.post('/logout', async (req, res) => {
  if (!req.session.userId) {
    return res.status(400).json({ message: 'Not logged in' });
  }
  try {
    return req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to logout'});
      }
      return res.status(200).send();
    })
  } catch (err) {
    return res.status(500).json({ err });
  }
});

module.exports = router;
