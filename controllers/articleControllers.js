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
  updateVotesOnArticleById(article_id, inc_votes)
    .then(article => {
      res.status(201).send({ article: article[0] });
    })
    .catch(next);
};

module.exports = { sendArticleById, addArticleById };
