const express = require("express");
const usersRouter = express.Router();
const sendUserById = require("../controllers/usersControllers");

//Get request to get a user by their username
usersRouter.get("/:username", sendUserById);

module.exports = usersRouter;
