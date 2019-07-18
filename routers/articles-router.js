const express = require("express");
const articlesRouter = express.Router();
const { sendArticleById } = require("../controllers/articleControllers");
const { updateVotesByArticleId, sendAllArticles } = require("../controllers/articleControllers");
const { addCommentByArticleId, sendAllCommentsByArticleId } = require("../controllers/commentsControllers");


articlesRouter
  .route('/')
  .get(sendAllArticles)

articlesRouter
  .route("/:article_id")
  .get(sendArticleById)
  .patch(updateVotesByArticleId);

articlesRouter
  .route("/:article_id/comments")
  .post(addCommentByArticleId)
  .get(sendAllCommentsByArticleId);

module.exports = articlesRouter;
