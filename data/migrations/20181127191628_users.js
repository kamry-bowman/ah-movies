
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (tbl) => {
    tbl.increments();
    tbl.string('username').unique().notNullable();
    tbl.string('hash').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
