const connection = require("../db/connection");

//Get request to get all topics
const selectAllTopics = () => {
  return connection
    .select("*")
    .from("topics")
};

module.exports = selectAllTopics;
