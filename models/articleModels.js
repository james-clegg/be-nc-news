const connection = require("../db/connection");

const selectArticleById = article_id => {
  return connection
    .select(
      "articles.author",
      "title",
      "articles.article_id",
      "articles.body",
      "topic",
      "articles.created_at",
      "articles.votes"
    )
    .count("comment_id as comment_count")
    .from("articles")
    .where("articles.article_id", article_id)
    .join("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id");
};

const updateVotesOnArticleById = (article_id, inc_votes) => {
  return connection
    .select("*")
    .from("articles")
    .where("article_id", article_id)
    .increment("votes", inc_votes)
    .returning('*')
};

module.exports = { selectArticleById, updateVotesOnArticleById };