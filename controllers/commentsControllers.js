const {
  insertComment,
  selectAllCommentsByArticleId,
  incrementVotesonCommentByCommentId,
  deleteCommentByCommentId
} = require("../models/commentsModels");

//Post request to post a new comment on a given article
const addCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username } = req.body;
  const { body } = req.body;
  //Checking that all of the necessary values are present and in a valid format
  if (article_id === undefined || username === undefined || body === undefined)
    next({ status: 400, msg: "No body on request" });
    //Checking that there are no unexpected keys on the request body
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

//Get request to get an array of all the comments for a particular article
const sendAllCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  selectAllCommentsByArticleId(article_id, req.query)
    .then(arrayOfComments => {
      res.status(200).send({ comments: arrayOfComments });
    })
    .catch(next);
};

//Patch request to update the votes total of a particular comment
const updateVotesOnCommentbyCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  //Checking that the votes is present on the request body
  if (inc_votes === undefined) next({ status: 400, msg: "No body on request" });
  //Checking that there are no unexpected keys on the body
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

//Delete request removes a particular comment by its ID
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
