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

module.exports = { addCommentByArticleId, sendAllCommentsByArticleId };
