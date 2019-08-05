const express = require("express");
const apiRouter = express.Router();
const topicsRouter = require("./topics-router");
const userRouter = require("./users-router");
const articlesRouter = require("./articles-router");
const commentsRouter = require("./comments-router");
const { handleInvalidMethods } = require("../errors/index");
const getApiJson = require("../controllers/apiController");

apiRouter
  .route("/")
  .get(getApiJson)
  .all(handleInvalidMethods);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
