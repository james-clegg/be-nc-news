const express = require("express");
const topicsRouter = express.Router();
const sendAllTopics = require("../controllers/topicsControllers");
const {handleInvalidMethods} = require("../errors/index");

topicsRouter
  .route("/")
  .get(sendAllTopics)
  .all(handleInvalidMethods);

module.exports = topicsRouter;
