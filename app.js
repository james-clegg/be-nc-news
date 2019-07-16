const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors
} = require("./errors");

app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "route does not exist" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
