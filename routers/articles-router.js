const express = require("express");
const articlesRouter = express.Router();
const {sendArticleById} = require("../controllers/articleControllers");
const {addArticleById} = require("../controllers/articleControllers");

articlesRouter
  .route("/:article_id")
  .get(sendArticleById)
  .patch(addArticleById);

module.exports = articlesRouter;
