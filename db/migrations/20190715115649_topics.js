exports.up = function(knex) {
  return knex.schema.createTable("topics", topicsTable => {
    topicsTable.string("slug", 100).primary();
    topicsTable.string("description").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("topics");
};
