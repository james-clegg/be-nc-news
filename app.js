const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");
const {
  handleNonExistentRoutes,
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors
} = require("./errors");

app.use(express.json())
app.use("/api", apiRouter);

app.all("/*", handleNonExistentRoutes);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
