/* eslint-disable func-names */
const actorMovieMap = require('../actorMovieMap');
const actors = require('../actors');
const movies = require('../movies');
const studios = require('../studios');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('studios').truncate()
    .then(() => {
      // Inserts seed entries
      return knex('studios').insert(studios);
    })
    .then(() => {
      return knex('actors').truncate()
        .then(() => {
          // Inserts seed entries
          return knex('actors').insert(actors);
        });
    })
    .then(() => {
      return knex('movies').truncate()
        .then(() => {
          // Inserts seed entries
          return knex('movies').insert(movies);
        });
    })
    .then(() => {
      return knex('actorMovieMap').truncate()
        .then(() => {
          // Inserts seed entries
          return knex('actorMovieMap').insert(actorMovieMap);
        });
    });
};
