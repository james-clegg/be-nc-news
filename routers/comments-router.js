const express = require("express");
const commentsRouter = express.Router();
const {updateVotesOnCommentbyCommentId, removeCommentByCommentId} = require('../controllers/commentsControllers');

commentsRouter
.route('/:comment_id')
.patch(updateVotesOnCommentbyCommentId)
.delete(removeCommentByCommentId)



module.exports = commentsRouter;