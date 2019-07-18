const insertComment = require("../models/commentsModels");

const addCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username } = req.body;
  const { body } = req.body;
  insertComment(article_id, username, body)
    .then(insertedComment => {
      res.status(201).send({ comment: insertedComment });
    })
    .catch(next);
};

module.exports = addCommentByArticleId;
