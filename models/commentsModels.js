const connection = require("../db/connection");

//Post request to post a new comment on a given article
const insertComment = (article_id, username, body) => {
  return connection("comments")
    .returning("*")
    .insert({ article_id: article_id, author: username, body: body });
};

//Get request to get an array of all the comments for a particular article
const selectAllCommentsByArticleId = (
  article_id,
  { sort_by = "created_at", order = "desc" }
) => {
  return connection
    .select("*")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sort_by, order)
    .returning("*")
    .then(commentsArray => {
      if (!commentsArray.length) {
        return connection
          .select("*")
          .from("articles")
          .where("article_id", article_id)
          .then(articleInfo => {
            //Checking if the articles exists and simply has no comments or whether the articles is an endpoint that does not exist. Need to refactor the nested .then block into something less gross.
            if (!articleInfo.length) {
              return Promise.reject({
                status: 404,
                msg: `No article found for article_id: ${article_id}`
              });
            }
            return commentsArray;
          });
      }
      return commentsArray;
    });
};

//Patch request to update the votes total of a particular comment
const incrementVotesonCommentByCommentId = (comment_id, inc_votes) => {
  return connection
    .select("*")
    .from("comments")
    .where("comment_id", comment_id)
    .increment("votes", inc_votes)
    .returning("*");
};

//Delete request removes a particular comment by its ID
const deleteCommentByCommentId = comment_id => {
  return connection
    .select("*")
    .from("comments")
    .where("comment_id", comment_id)
    .returning("*")
    .then(comments => {
      //Checks if the comment exists before attempting to delete it.
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

module.exports = {
  insertComment,
  selectAllCommentsByArticleId,
  incrementVotesonCommentByCommentId,
  deleteCommentByCommentId
};
