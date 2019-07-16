const selectUserById = require("../models/usersModels");

const sendUserById = (req, res, next) => {
  const { username } = req.params;
  selectUserById(username)
    .then(user => {
      res.status(200).send(user[0]);
    })
    .catch(next);
};

module.exports = sendUserById;
