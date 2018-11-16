exports.up = function (knex, Promise) {
  return knex.schema.createTable('studios', (table) => {
    table.increments('id');
    table.string('name').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('studios');
};
