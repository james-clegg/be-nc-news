const connection = require("../db/connection");

const selectUserById = username => {
  return connection
    .select("*")
    .from("users")
    .where('username', username)
    .returning("*");
};

module.exports = selectUserById;
