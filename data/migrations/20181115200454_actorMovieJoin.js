/* eslint-disable func-names */
exports.up = function (knex, Promise) {
  return knex.schema.createTable('actorMovieMap', (table) => {
    table.increments('id');
    table.integer('movieId').references('movies.id');
    table.integer('actorId').references('actors.id');
  }).then(() => {
    return knex.schema.alterTable('actorMovieMap', (t) => {
      t.unique(['movieId', 'actorId']);
    });
  });
};


exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('actorMovieMap');
};
