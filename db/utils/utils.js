exports.formatDates = list => {
  const listCopy = [...list];
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
  if (comments.length === 0) return [];
  const commentsCopy = [...comments];
  commentsCopy.forEach(comment => {
    comment.author = comment.created_by;
    delete comment.created_by;
    comment.article_id = articleRef[comment.author];
    delete comment.belongs_to;
  });
  this.formatDates(commentsCopy);
  return commentsCopy;
};
