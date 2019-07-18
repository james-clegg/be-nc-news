const {
  selectArticleById,
  updateVotesOnArticleById
} = require("../models/articleModels.js");

const sendArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then(article => {
      if (!article.length) {
        return next({
          status: 404,
          msg: `No article found for article_id: ${article_id}`
        });
      }
      res.status(200).send({ article: article[0] });
    })
    .catch(next);
};

const addArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  const regex = /\D/g;
  if (inc_votes === undefined) next({ status: 400, msg: "No body on request" });
  else if (regex.test(inc_votes))
    next({ status: 400, msg: "body in invalid format" });
  else if (Object.keys(req.body).length > 1)
    next({ status: 400, msg: "body contains unexpected keys" });
  else {
    updateVotesOnArticleById(article_id, inc_votes)
      .then(article => {
        if (!article.length) {
          next({
            status: 404,
            msg: `No article found for article_id: ${article_id}`
          });
        } else {
          res.status(201).send({ article: article[0] });
        }
      })
      .catch(next);
  }
};

module.exports = { sendArticleById, addArticleById };
