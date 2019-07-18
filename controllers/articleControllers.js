const {
  selectArticleById,
  updateVotesOnArticleById,
  selectAllArticles
} = require("../models/articleModels.js");

//Get request to get an article by its ID
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

//Patch request to update the votes property of a particular article
const updateVotesByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  //Checking if there is a body on the request
  if (inc_votes === undefined) next({ status: 400, msg: "No body on request" });
  //Checking if there are any keys that aren't supposed to be there
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
          res.status(200).send({ article: article[0] });
        }
      })
      .catch(next);
  }
};

//Get request to get all of the articles
const sendAllArticles = (req, res, next) => {
  const { sort_by, order = "desc", author, topic } = req.query;
  //Checking that order isn't an invalid value
  if (order === "asc" || order === "desc") {
    selectAllArticles(sort_by, order, author, topic)
      .then(arrayOfArticles => {
        res.status(200).send({ articles: arrayOfArticles });
      })
      .catch(next);
  } else {
    next({ status: 400, msg: "Order is in invalid format" });
  }
};

module.exports = { sendArticleById, updateVotesByArticleId, sendAllArticles };
