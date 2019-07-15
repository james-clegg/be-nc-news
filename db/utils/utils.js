exports.formatDates = list => {
  // take an array of objects and return an array of items with their timestamp converted into a js date object
  // sounds like a job for .map() to me.

  list.forEach(object => {
    object.created_at = new Date(object.created_at);
  });
  return list;
};

exports.makeRefObj = list => {
  // should take an array and return a ref object keyed with each items title and the values being the ids.
  // eg. will take an object like {article_id: 1, title: 'a'} and will return as {a: 1}
  // again, sounds like a map
};

exports.formatComments = (comments, articleRef) => {
  // will take an array of objects and a reference object and return an array of comments formatted with:
  // Its created_by property renamed to an author key
  // Its belongs_to property renamed to an article_id key
  // The value of the new article_id key must be the id corresponding to the original title value provided
  // Its created_at value converted into a javascript date object
  // The rest of the comment's properties must be maintained
};
