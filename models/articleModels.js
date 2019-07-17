const connection = require("../db/connection");


const selectArticleById = (article_id) => {
  return connection
  .select('*')
  .from('articles')
  .join('comments', 'articles.article_id', '=', 'comments.article_id')
}




module.exports = selectArticleById;