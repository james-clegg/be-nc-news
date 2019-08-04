const express = require("express");
const commentsRouter = express.Router();
const {
  updateVotesOnCommentbyCommentId,
  removeCommentByCommentId
} = require("../controllers/commentsControllers");
const { handleInvalidMethods } = require("../errors/index");

commentsRouter
  .route("/:comment_id")
  .patch(updateVotesOnCommentbyCommentId)
  .delete(removeCommentByCommentId)
  .all(handleInvalidMethods);

module.exports = commentsRouter;
