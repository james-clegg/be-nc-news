const ENV = process.env.NODE_ENV || "development";
const knex = require("knex");

const dbConfig =
  ENV === "production"
    ? { client: "pg", connection: process.env.jc-nc-news }
    : require("../knexfile.js");

const connection = knex(dbConfig);

module.exports = connection;
