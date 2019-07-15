exports.up = function(knex) {
  console.log("creating users table");
  return knex.schema.createTable("users", usersTable => {
    usersTable.string("username", 100).primary();
    usersTable.string("avatar_url").notNullable();
    usersTable.string("name", 100).notNullable();
  });
};

exports.down = function(knex) {
  console.log("removing users table");
  return knex.schema.dropTable("users");
};
