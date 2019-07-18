//Handles any route that doesn't have a designated endpoint
const handleNonExistentRoutes = (req, res, next) => {
  res.status(404).send({ msg: "route does not exist" });
};

//Handles any custom errors set up 
const handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

//Handles errors thrown by PSQL
const handlePsqlErrors = (err, req, res, next) => {
  const psqlBadRequestCodes = {
    "22P02": { status: 400, msg: "Invalid input syntax" },
    "23503": { status: 404, msg: "Article_id does not exist" },
    "42703": { status: 400, msg: "Column does not exist" }
  };
  if (psqlBadRequestCodes[err.code])
    res
      .status(psqlBadRequestCodes[err.code].status)
      .send({ msg: psqlBadRequestCodes[err.code].msg || "Bad Request" });
  else next(err);
};

//Handles any leftover errors
const handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
};

//if it gets past here we have bigger problems

module.exports = {
  handleNonExistentRoutes,
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors
};
