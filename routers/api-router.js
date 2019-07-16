const express = require('express');
const apiRouter = express.Router();
const topicsRouter = require("./topics-router");
const userRouter = require('./users-router');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', userRouter)

module.exports = apiRouter;