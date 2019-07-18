const express = require("express");
const commentsRouter = express.Router();
const {updateVotesOnCommentbyCommentId, removeCommentByCommentId} = require('../controllers/commentsControllers');


//Patch request to update the votes total of a particular comment
//Delete request removes a particular comment by its ID
commentsRouter
.route('/:comment_id')
.patch(updateVotesOnCommentbyCommentId)
.delete(removeCommentByCommentId)



module.exports = commentsRouter;