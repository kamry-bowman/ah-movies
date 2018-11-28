const express = require('express');
const knex = require('knex');
const knexfile = require('../knexfile');

const db = knex(knexfile.development);

const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await db('movies');

  return res.status(200).json(movies);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const moviePromise = db('movies')
      .join('studios', 'movies.studioId', '=', 'studios.id')
      .where('movies.id', '=', id)
      .select('movies.id', 'movies.title', db.ref('studios.name').as('studio'))
      .first();

    const actorsPromise = db('actorMovieMap')
      .join('actors', 'actorMovieMap.actorId', '=', 'actors.id')
      .where('actorMovieMap.movieId', '=', id)
      .select('actors.name')
      .then(actors => actors.map(actor => actor.name));
    
    const result = await Promise.all([moviePromise, actorsPromise]);
    // const [movie, actors]= await Promise.all([movie, actors]);
    const [movie, actors] = result;

    return movie
      ? res.status(200).json({ ...movie, actors }) 
      : res.status(404).json({ message: 'BAD ID!!!!!!!!' });
  } catch (err) {
    res.status(500).json({ message: 'Database error', err });
  }
});

module.exports = router;
