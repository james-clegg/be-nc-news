const express = require("express");
const topicsRouter = express.Router();
const sendAllTopics = require("../controllers/topicsControllers");

//Get request to get all topics
topicsRouter.get("/", sendAllTopics);

module.exports = topicsRouter;
