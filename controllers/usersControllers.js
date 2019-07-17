const selectUserById = require("../models/usersModels");

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
      res.status(200).send({user: user[0]});
    })
    .catch(next);
};

module.exports = sendUserById;
