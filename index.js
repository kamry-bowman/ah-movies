const express = require('express');
const knex = require('knex');
const knexfile = require('./knexfile');

const db = knex(knexfile.development);

const server = express();
server.use(express.json());

server.get('/films', async (req, res) => {
  db('films');
});


server.listen(8000, () => { console.log('Listening on 8000') });