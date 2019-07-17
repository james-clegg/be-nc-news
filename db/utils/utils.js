exports.formatDates = list => {
  const listCopy = [...list];
  return listCopy.map(({ created_at, ...restOfObject }) => {
    created_at = new Date(created_at);
    return { created_at, ...restOfObject };
  });
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

  return commentsCopy.map(
    ({ created_by, belongs_to, created_at, ...comment }) => {
      comment.author = created_by;
      delete created_by;
      comment.article_id = articleRef[belongs_to];
      delete belongs_to;
      created_at = new Date(created_at);
      return { created_at, ...comment };
    }
  );
};
