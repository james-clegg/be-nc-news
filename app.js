const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");
var cors = require("cors");
const {
  handleNonExistentRoutes,
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors
} = require("./errors");
app.use(cors());

app.use(express.json());
app.use("/api", apiRouter);

app.all("/*", handleNonExistentRoutes);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
