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

//Get request to get all of the articles
articlesRouter.route("/").get(sendAllArticles);

//Get request to get an article by its ID
//Patch request to update the votes property of a particular article
articlesRouter
  .route("/:article_id")
  .get(sendArticleById)
  .patch(updateVotesByArticleId);

//Post request to post a new comment on a given article
//Get request to get an array of all the comments for a particular article
articlesRouter
  .route("/:article_id/comments")
  .post(addCommentByArticleId)
  .get(sendAllCommentsByArticleId);

module.exports = articlesRouter;
