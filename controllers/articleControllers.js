const selectArticleById = require("../models/articleModels.js");

const sendArticleById = (req, res, next) => {
  const {article_id} = req.params;
  selectArticleById(article_id)
    .then(article => {
      res.status(200).send(article);
    })
    .catch(next);
};

module.exports = sendArticleById;
