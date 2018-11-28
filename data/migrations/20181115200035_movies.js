exports.up = function (knex, Promise) {
  return knex.schema.createTable('movies', (table) => {
    table.increments('id');
    table.string('title').notNullable();
    table.integer('studioId').references('studios.id');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('movies');
};
