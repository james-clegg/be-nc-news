const selectAllTopics = require("../models/topicsModels");

//Get request to get all topics
const sendAllTopics = (req, res, next) => {
  selectAllTopics()
    .then(topicsArray => {
      res.status(200).send({ topics: topicsArray });
    })
    .catch(next);
};

module.exports = sendAllTopics;
