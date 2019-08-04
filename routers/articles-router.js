const express = require("express");
const articlesRouter = express.Router();
const {
  sendArticleById,
  updateVotesByArticleId,
  sendAllArticles
} = require("../controllers/articleControllers");
const {
  addCommentByArticleId,
  sendAllCommentsByArticleId
} = require("../controllers/commentsControllers");

const { handleInvalidMethods } = require("../errors/index");

articlesRouter
  .route("/")
  .get(sendAllArticles)
  .all(handleInvalidMethods);

articlesRouter
  .route("/:article_id")
  .get(sendArticleById)
  .patch(updateVotesByArticleId)
  .all(handleInvalidMethods);

articlesRouter
  .route("/:article_id/comments")
  .post(addCommentByArticleId)
  .get(sendAllCommentsByArticleId)
  .all(handleInvalidMethods);

module.exports = articlesRouter;
