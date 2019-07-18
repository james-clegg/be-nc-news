const express = require("express");
const commentsRouter = express.Router();
const {updateVotesOnCommentbyCommentId} = require('../controllers/commentsControllers');

commentsRouter
.route('/:comment_id')
.patch(updateVotesOnCommentbyCommentId)



module.exports = commentsRouter;