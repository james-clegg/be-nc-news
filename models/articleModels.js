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
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id");
};

const updateVotesOnArticleById = (article_id, inc_votes) => {
  return connection
    .select("*")
    .from("articles")
    .where("article_id", article_id)
    .increment("votes", inc_votes)
    .returning("*");
};

const selectAllArticles = (sort_by, order, author, topic) => {
  return connection
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.topic",
      "articles.body",
      "articles.created_at",
      "articles.votes"
    )
    .from("articles")
    .orderBy(sort_by, order)
    .count("comment_id as comment_count")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .modify(query => {
      if (author) query.where({ "articles.author": author });
      if (topic) query.where({ topic });
    })
    .then(articles => {
      if (!articles.length && author)
        return Promise.reject({
          status: 404,
          msg:
            "Author is not in the database or does not have any articles associated with them"
        });
      else if (!articles.length && topic)
        return Promise.reject({
          status: 404,
          msg:
            "Topic is not in the database or does not have any articles associated with it"
        });
      else return articles;
    });
};

module.exports = {
  selectArticleById,
  updateVotesOnArticleById,
  selectAllArticles
};
