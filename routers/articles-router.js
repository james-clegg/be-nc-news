const express = require('express');
const articlesRouter = express.Router();
const sendArticleById = require('../controllers/articleControllers');

articlesRouter.get('/:article_id', sendArticleById);

module.exports = articlesRouter;