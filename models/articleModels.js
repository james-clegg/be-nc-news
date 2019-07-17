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
    .where('articles.article_id', article_id)
    .join("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id");
};

module.exports = selectArticleById;
