const connection = require("../db/connection");

const selectAllTopics = () => {
  return connection
    .select("*")
    .from("topics")
    .returning("*");
};

module.exports = selectAllTopics;
