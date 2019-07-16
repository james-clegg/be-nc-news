const express = require('express');
const topicsRouter = express.Router();
const sendAllTopics = require('../controllers/topicsControllers');

topicsRouter.get('/', sendAllTopics);

module.exports = topicsRouter;