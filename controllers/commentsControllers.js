const {
  insertComment,
  selectAllCommentsByArticleId
} = require("../models/commentsModels");

const addCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username } = req.body;
  const { body } = req.body;
  if (article_id === undefined || username === undefined || body === undefined)
    next({ status: 400, msg: "No body on request" });
  else if (Object.keys(req.body).length > 2)
    next({ status: 400, msg: "body contains unexpected keys" });
  else {
    insertComment(article_id, username, body)
      .then(insertedComment => {
        res.status(201).send({ comment: insertedComment });
      })
      .catch(next);
  }
};

const sendAllCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  selectAllCommentsByArticleId(article_id, req.query)
    .then(arrayOfComments => {
      res.status(200).send({ comments: arrayOfComments });
    })
    .catch(next);
};

const updateVotesOnCommentbyCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  if (inc_votes === undefined) next({ status: 400, msg: "No body on request" });
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
          res.status(200).send({ comment: updatedComment });
        }
      })
      .catch(next);
  }
};

module.exports = {
  addCommentByArticleId,
  sendAllCommentsByArticleId,
  updateVotesOnCommentbyCommentId
};
