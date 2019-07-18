const handleNonExistentRoutes = (req, res, next) => {
  res.status(404).send({ msg: "route does not exist" });
};

const handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

const handlePsqlErrors = (err, req, res, next) => {
  const psqlBadRequestCodes = {
    '22P02': 'Invalid input syntax',
    '23503': 'Article_id does not exist'
  };
  if (psqlBadRequestCodes[err.code])
    res.status(400).send({ msg: psqlBadRequestCodes[err.code] || "Bad Request" });
  else next(err);
};

const handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
};

module.exports = {
  handleNonExistentRoutes,
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors
};
