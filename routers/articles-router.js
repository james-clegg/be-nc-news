const express = require("express");
const articlesRouter = express.Router();
const {sendArticleById} = require("../controllers/articleControllers");
const { updateVotesByArticleId} = require("../controllers/articleControllers");

articlesRouter
  .route("/:article_id")
  .get(sendArticleById)
  .patch(updateVotesByArticleId);

module.exports = articlesRouter;
