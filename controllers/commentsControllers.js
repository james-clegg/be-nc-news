const {
  insertComment,
  selectAllCommentsByArticleId,
  incrementVotesonCommentByCommentId,
  deleteCommentByCommentId,
  selectCommentByCommentId
} = require("../models/commentsModels");

const addCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  if (article_id === undefined || username === undefined || body === undefined)
    next({ status: 400, msg: "No body on request" });
  else if (Object.keys(req.body).length > 2)
    next({ status: 400, msg: "body contains unexpected keys" });
  else {
    insertComment(article_id, username, body)
      .then(insertedComment => {
        res.status(201).send({ comment: insertedComment[0] });
      })
      .catch(next);
  }
};

const sendAllCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by = "created_at", order = "desc" } = req.query;
  selectAllCommentsByArticleId(article_id, sort_by, order)
    .then(arrayOfComments => {
      res.status(200).send({ comments: arrayOfComments });
    })
    .catch(next);
};

const updateVotesOnCommentbyCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  if (inc_votes === undefined)
    selectCommentByCommentId(comment_id).then(comment =>
      res.status(200).send({ comment: comment[0] })
    );
  else if (Object.keys(req.body).length > 1)
    next({ status: 400, msg: "body contains unexpected keys" });
  else {
    incrementVotesonCommentByCommentId(comment_id, inc_votes)
      .then(updatedComment => {
        if (!updatedComment.length) {
          next({
            status: 404,
            msg: `No comments found for comment_id: ${comment_id}`
          });
        } else {
          res.status(200).send({ comment: updatedComment[0] });
        }
      })
      .catch(next);
  }
};

const removeCommentByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  deleteCommentByCommentId(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

module.exports = {
  addCommentByArticleId,
  sendAllCommentsByArticleId,
  updateVotesOnCommentbyCommentId,
  removeCommentByCommentId
};
