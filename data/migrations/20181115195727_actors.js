
exports.up = function (knex, Promise) {
  return knex.schema.createTable('actors', (table) => {
    table.increments('id');
    table.string('name').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('actors');
};