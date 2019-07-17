const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");
const {
  handleNonExistentRoutes,
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors
} = require("./errors");

// API router

app.use("/api", apiRouter);

// Error handlers:

app.all("/*", handleNonExistentRoutes);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
