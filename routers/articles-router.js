const express = require("express");
const articlesRouter = express.Router();
const {sendArticleById} = require("../controllers/articleControllers");
const { updateVotesByArticleId} = require("../controllers/articleControllers");
const addCommentByArticleId = require("../controllers/commentsControllers");


articlesRouter
  .route("/:article_id")
  .get(sendArticleById)
  .patch(updateVotesByArticleId);

articlesRouter.route('/:article_id/comments').post(addCommentByArticleId);

module.exports = articlesRouter;
