// Gathering the testData to be exported more easily.

const articleData = require("./articles");
const commentData = require("./comments");
const topicData = require("./topics");
const userData = require("./users");

const testData = {
  articleData,
  commentData,
  topicData,
  userData
};

module.exports = testData;
