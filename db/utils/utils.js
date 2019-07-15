exports.formatDates = list => {
  const listCopy = list;
  listCopy.forEach(object => {
    object.created_at = new Date(object.created_at);
  });
  return listCopy;
};

exports.makeRefObj = list => {
  const objToReturn = {};
  list.forEach(article => {
    objToReturn[article.title] = article.article_id;
  });
  return objToReturn;
};

exports.formatComments = (comments, articleRef) => {
  // will take an array of objects and a reference object and return an array of comments formatted with:
  // Its created_by property renamed to an author key
  // Its belongs_to property renamed to an article_id key
  // The value of the new article_id key must be the id corresponding to the original title value provided
  // Its created_at value converted into a javascript date object
  // The rest of the comment's properties must be maintained
  const commentsCopy = comments;
  commentsCopy.forEach(comment => {
    comment.author = comment.created_by;
    delete comment.created_by;
    comment.
  });

};
