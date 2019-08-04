const express = require("express");
const usersRouter = express.Router();
const sendUserById = require("../controllers/usersControllers");
const {handleInvalidMethods} = require("../errors/index");

usersRouter
  .route("/:username")
  .get(sendUserById)
  .all(handleInvalidMethods);

module.exports = usersRouter;
