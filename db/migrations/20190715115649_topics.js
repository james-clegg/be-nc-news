exports.up = function(knex) {
  console.log("creating topics table");
  return knex.schema.createTable("topics", topicsTable => {
    topicsTable.string("slug", 100).primary();
    topicsTable.string("description");
  });
};

exports.down = function(knex) {
  console.log("removing topics table");
  return knex.schema.dropTable("topics");
};
