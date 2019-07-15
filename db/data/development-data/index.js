// Gathering the devData to be exported more easily.

const articleData = require("./articles");
const commentData = require("./comments");
const topicData = require("./topics");
const userData = require("./users");

const devData = {
  articleData,
  commentData,
  topicData,
  userData
};

module.exports = devData;
