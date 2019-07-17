exports.up = function(knex) {
  return knex.schema.createTable("users", usersTable => {
    usersTable.string("username", 100).primary();
    usersTable.string("avatar_url").notNullable();
    usersTable.string("name", 100).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
