const connection = require("../db/connection");

const insertComment = (article_id, username, body) => {
  return connection("comments")
    .returning("*")
    .insert({ article_id: article_id, author: username, body: body });
};

module.exports = insertComment;
