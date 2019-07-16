const express = require('express');
const usersRouter = express.Router();
const sendUserById = require('../controllers/usersControllers');

usersRouter.get('/:username', sendUserById);

module.exports = usersRouter;