const selectUserById = require("../models/usersModels");

//Get request to get a user by their username
const sendUserById = (req, res, next) => {
  const { username } = req.params;
  selectUserById(username)
    .then(user => {
      if (!user.length) {
        return next({
          status: 404,
          msg: `No user found for username: ${username}`
        });
      }
      res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = sendUserById;
