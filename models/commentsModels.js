const connection = require("../db/connection");

const insertComment = (article_id, username, body) => {
  return connection("comments")
    .returning("*")
    .insert({ article_id: article_id, author: username, body: body });
};

const selectAllCommentsByArticleId = (article_id, sort_by, order) => {
  return connection
    .select("*")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sort_by, order)
    .returning("*")
    .then(commentsArray => {
      if (commentsArray.length > 0) {
        return commentsArray;
      }
      return commentsArray;
    })
    .then(commentsArray => {
      const articleInfo = connection
        .select("*")
        .from("articles")
        .where("article_id", article_id)
        .returning("*");
      return Promise.all([commentsArray, articleInfo]);
    })
    .then(([commentsArray, articleInfo]) => {
      if (!articleInfo.length) {
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${article_id}`
        });
      }
      return commentsArray;
    });
};

const incrementVotesonCommentByCommentId = (comment_id, inc_votes) => {
  return connection
    .select("*")
    .from("comments")
    .where("comment_id", comment_id)
    .increment("votes", inc_votes)
    .returning("*");
};

const deleteCommentByCommentId = comment_id => {
  return connection
    .select("*")
    .from("comments")
    .where("comment_id", comment_id)
    .returning("*")
    .then(comments => {
      if (!comments.length) {
        return Promise.reject({
          status: 404,
          msg: "No comments found for comment_id 9999"
        });
      } else {
        return connection("comments")
          .where("comment_id", comment_id)
          .del();
      }
    });
};

const selectCommentByCommentId = comment_id => {
  return connection
    .select("*")
    .from("comments")
    .where("comment_id", comment_id);
};

module.exports = {
  insertComment,
  selectAllCommentsByArticleId,
  incrementVotesonCommentByCommentId,
  deleteCommentByCommentId,
  selectCommentByCommentId
};
