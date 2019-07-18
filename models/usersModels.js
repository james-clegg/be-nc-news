const connection = require("../db/connection");

//Get request to get a user by their username
const selectUserById = username => {
  return connection
    .select("*")
    .from("users")
    .where('username', username)
    .returning("*");
};

module.exports = selectUserById;
