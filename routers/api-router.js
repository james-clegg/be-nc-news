const express = require("express");
const apiRouter = express.Router();
const topicsRouter = require("./topics-router");
const userRouter = require("./users-router");
const articlesRouter = require("./articles-router");
const commentsRouter = require('./comments-router');

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use('/comments', commentsRouter)

module.exports = apiRouter;
