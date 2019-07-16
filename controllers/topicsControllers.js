const selectAllTopics = require("../models/topicsModels");

const sendAllTopics = (req, res, next) => {
  selectAllTopics()
    .then(topicsArray => {
      res.status(200).send({ topics: topicsArray });
    })
    .catch(console.log);
};

module.exports = sendAllTopics;
