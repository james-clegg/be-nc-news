const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");

app.use("/api", apiRouter);

app.use("/*", (req, res, next) => {
  res.status(404).send({ msg: "route does not exist" });
});

module.exports = app;
