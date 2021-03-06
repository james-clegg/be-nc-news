process.env.NODE_ENV = "test";
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-sorted"));
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

describe("/api", () => {
  after(() => connection.destroy());
  beforeEach(() => connection.seed.run());

  describe("/topics", () => {
    it("GET returns an object with a key of 'topics' and a value of an array of all the topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics).to.be.an("array");
        });
    });
    it("GET returns an object with an array of objects with keys of 'description' and 'slug'", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics[0]).to.have.all.keys("slug", "description");
        });
    });
    it("GET ERROR returns a 404 and error message when given an incorrect route", () => {
      return request(app)
        .get("/api/banana")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal("route does not exist");
        });
    });
    it("PUT ERROR returns invalid method on route", () => {
      return request(app)
        .put("/api/topics")
        .expect(405);
    });
  });

  describe("/users/:username", () => {
    it("GET should return a user object", () => {
      return request(app)
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user).to.be.an("object");
        });
    });
    it("GET should return a user object with keys of username, avatar_url, and name", () => {
      return request(app)
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user).to.have.all.keys("username", "avatar_url", "name");
        });
    });
    it("GET ERROR should return a 404 when passed a username that does not exist", () => {
      return request(app)
        .get("/api/users/NOT_A_USER")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal("No user found for username: NOT_A_USER");
        });
    });
    it("PUT ERROR returns invalid method on route", () => {
      return request(app)
        .put("/api/users/butter_bridge")
        .expect(405);
    });
  });

  describe("/articles/:article_id", () => {
    it("GET should return an article object", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article).to.be.an("object");
        });
    });
    it("GET should return an article object with keys of author, title, article_id, body, topic, created_at, votes, and comment_count", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article).to.have.all.keys(
            "author",
            "title",
            "article_id",
            "topic",
            "body",
            "created_at",
            "votes",
            "comment_count"
          );
        });
    });
    it("GET ERROR returns 404 if article id does not exist in the database", () => {
      return request(app)
        .get("/api/articles/9999")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.eql("No article found for article_id: 9999");
        });
    });
    it("GET ERROR returns 400 if parametric endpoint is in the wrong format", () => {
      return request(app)
        .get("/api/articles/NOT_AN_INTEGER")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).eql("Invalid input syntax");
        });
    });
    it("PATCH returns 200 and the updated article", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article).to.have.all.keys(
            "author",
            "title",
            "article_id",
            "topic",
            "body",
            "created_at",
            "votes"
          );
        });
    });
    it("PATCH ERROR returns 404 if article_id does not exist", () => {
      return request(app)
        .patch("/api/articles/9999")
        .send({ inc_votes: 1 })
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.eql("No article found for article_id: 9999");
        });
    });
    it("PATCH ERROR returns 400 if article_id was in the incorrect format", () => {
      return request(app)
        .patch("/api/articles/NOT_AN_INTEGER")
        .send({ inc_votes: 1 })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).eql("Invalid input syntax");
        });
    });
    it("PATCH ERROR returns 200 and the unchanged article if there is no body on the request", () => {
      return request(app)
        .patch("/api/articles/1")
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article).to.eql({
            author: "butter_bridge",
            title: "Living in the shadow of a great man",
            article_id: 1,
            body: "I find this existence challenging",
            topic: "mitch",
            created_at: "2018-11-15T12:21:54.171Z",
            votes: 100,
            comment_count: "13"
          });
        });
    });
    it("PATCH ERROR returns 400 if the body on the request is in the incorrect format", () => {
      return request(app)
        .patch("/api/articles/1")
        .expect(400)
        .send({ inc_votes: "banana" })
        .then(({ body: { msg } }) => {
          expect(msg).eql("Invalid input syntax");
        });
    });
    it("PATCH ERROR returns 400 if the body on the request contains more than just inc_votes", () => {
      return request(app)
        .patch("/api/articles/1")
        .expect(400)
        .send({ inc_votes: 1, Shaq: "legend" })
        .then(({ body: { msg } }) => {
          expect(msg).eql("body contains unexpected keys");
        });
    });
    it("PUT ERROR returns invalid method on route", () => {
      return request(app)
        .put("/api/articles/1")
        .expect(405);
    });
  });

  describe("/api/articles/:article_id/comments", () => {
    it("POST returns 201 and returns the posted comment object", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .expect(201)
        .send({
          username: "butter_bridge",
          body: "insert witty catchphrase here"
        })
        .then(({ body: { comment } }) => {
          expect(comment).to.have.all.keys(
            "article_id",
            "author",
            "body",
            "comment_id",
            "created_at",
            "votes"
          );
        });
    });
    it("POST ERROR returns 404 if article_id does not exist", () => {
      return request(app)
        .post("/api/articles/9999/comments")
        .expect(404)
        .send({
          username: "butter_bridge",
          body: "insert witty catchphrase here"
        })
        .then(({ body: { msg } }) => {
          expect(msg).to.eql("Article_id does not exist");
        });
    });
    it("POST ERROR returns 400 if article_id was in the incorrect format", () => {
      return request(app)
        .post("/api/articles/NOT_AN_INTEGER/comments")
        .expect(400)
        .send({
          username: "butter_bridge",
          body: "insert witty catchphrase here"
        })
        .then(({ body: { msg } }) => {
          expect(msg).eql("Invalid input syntax");
        });
    });
    it("POST ERROR returns 400 if there is no body on the request", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).eql("No body on request");
        });
    });
    it("POST ERROR returns 400 if the body on the request contains more than the necessary keys", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .expect(400)
        .send({
          username: "butter_bridge",
          body: "insert witty catchphrase here",
          randomKey: "banana"
        })
        .then(({ body: { msg } }) => {
          expect(msg).eql("body contains unexpected keys");
        });
    });

    it("GET returns 200 and an array of comments for the given article ID", () => {
      return request(app)
        .get("/api/articles/5/comments")
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments).to.be.an("array");
        });
    });
    it("GET returns 200 and an array of comments each with the appropriate keys", () => {
      return request(app)
        .get("/api/articles/5/comments")
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments[0]).to.have.all.keys(
            "comment_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          );
        });
    });
    it("GET ERROR returns 404 if article id does not exist in the database", () => {
      return request(app)
        .get("/api/articles/9999/comments")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.eql("No article found for article_id: 9999");
        });
    });
    it("GET ERROR returns 400 if parametric endpoint is in the wrong format", () => {
      return request(app)
        .get("/api/articles/NOT_AN_INTEGER/comments")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).eql("Invalid input syntax");
        });
    });
    it("GET returns 200 and an empty array if the given article does not have any comments", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments).to.eql([]);
        });
    });
    it("GET returns 200 and an array sorted by created_at if no query is passed", () => {
      return request(app)
        .get("/api/articles/5/comments")
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments).to.be.sortedBy("created_at", { descending: true });
        });
    });
    it("GET returns 200 and an array sorted by a given variable if passed on as a query", () => {
      return request(app)
        .get("/api/articles/5/comments?sort_by=votes&order=asc")
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments).to.be.sortedBy("votes", { descending: false });
        });
    });
    it("PUT ERROR returns invalid method on route", () => {
      return request(app)
        .put("/api/articles/5/comments")
        .expect(405);
    });
  });

  describe("/api/articles", () => {
    it("GET returns 200 and an array of article objects with the correct keys", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles[0]).to.have.all.keys(
            "author",
            "title",
            "article_id",
            "topic",
            "body",
            "created_at",
            "votes",
            "comment_count"
          );
        });
    });
    it("GET returns 200 and an array of article objects sorted by a given column and in a given order", () => {
      return request(app)
        .get("/api/articles?sort_by=votes&order=asc")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).to.be.sortedBy("votes", { descending: false });
        });
    });
    it("GET returns 200 and an array of article objects sorted by a given (non-numeric) column", () => {
      return request(app)
        .get("/api/articles?sort_by=author")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).to.be.sortedBy("author", { descending: true });
        });
    });
    it("GET returns 200 and an array of article objects sorted by created_at and in descending order when passed no queries", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).to.be.sortedBy("created_at", { descending: true });
        });
    });
    it("GET returns 200 and an array of article objects sorted by created_at and in ascending order when passed no sorted by query and an ascending order", () => {
      return request(app)
        .get("/api/articles?order=asc")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).to.be.sortedBy("created_at", { descending: false });
        });
    });
    it("GET returns 200 and an array of article objects filtered for a specific author", () => {
      return request(app)
        .get("/api/articles?author=butter_bridge")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles[0].author).to.eql("butter_bridge");
        });
    });
    it("GET returns 200 and an array of article objects filtered for a specific topic", () => {
      return request(app)
        .get("/api/articles?topic=cats")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles[0].topic).to.eql("cats");
        });
    });
    it("GET returns 200 and an array of article objects sorted by votes ascending and filtered for a specific topic and author", () => {
      return request(app)
        .get(
          "/api/articles?topic=mitch&author=butter_bridge&sort_by=votes&order=asc"
        )
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles[0].topic).to.eql("mitch");
          expect(articles[0].author).to.eql("butter_bridge");
          expect(articles).to.be.sortedBy("votes", { descending: false });
        });
    });
    it("GET ERROR returns 400 when passed an invalid sort_by query", () => {
      return request(app)
        .get("/api/articles?sort_by=idkI'veWrittenSoMuchCode")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).to.eql("Column does not exist");
        });
    });
    it("GET ERROR returns 400 when passed an invalid order query", () => {
      return request(app)
        .get("/api/articles?order=INeedToCommitMore")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).to.eql("Order is in invalid format");
        });
    });
    it("GET ERROR returns 404 when passed an author to filter by that returns no articles", () => {
      return request(app)
        .get("/api/articles?author=fatboyslim")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.eql(
            "Author is not in the database or does not have any articles associated with them"
          );
        });
    });
    it("GET ERROR returns 404 when passed a topic to filter by that returns no articles", () => {
      return request(app)
        .get("/api/articles?topic=fatboyslim")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.eql(
            "Topic is not in the database or does not have any articles associated with it"
          );
        });
    });
    it("PUT ERROR returns invalid method on route", () => {
      return request(app)
        .put("/api/articles")
        .expect(405);
    });
  });

  describe("/api/comments/:comment_id", () => {
    it("PATCH should return 200 and an updated comment object with the new values", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body: { comment } }) => {
          expect(comment).to.have.all.keys(
            "comment_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          );
          expect(comment.votes).to.equal(17);
        });
    });
    it("PATCH ERROR returns 404 if comment_id does not exist", () => {
      return request(app)
        .patch("/api/comments/9999")
        .send({ inc_votes: 1 })
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.eql("No comments found for comment_id: 9999");
        });
    });
    it("PATCH ERROR returns 400 if comment_id was in the incorrect format", () => {
      return request(app)
        .patch("/api/comments/NOT_AN_INTEGER")
        .send({ inc_votes: 1 })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).to.eql("Invalid input syntax");
        });
    });
    it("PATCH ERROR returns 200 and the unedited comment if there is no body on the request", () => {
      return request(app)
        .patch("/api/comments/1")
        .expect(200)
        .then(({ body: { comment } }) => {
          expect(comment).to.eql({
            comment_id: 1,
            author: "butter_bridge",
            article_id: 9,
            votes: 16,
            created_at: "2017-11-22T12:36:03.389Z",
            body:
              "Oh, I've got compassion running out of my " +
              "nose, pal! I'm the Sultan of Sentiment!"
          });
        });
    });
    it("PATCH ERROR returns 400 if the body on the request is in the incorrect format", () => {
      return request(app)
        .patch("/api/comments/1")
        .expect(400)
        .send({ inc_votes: "banana" })
        .then(({ body: { msg } }) => {
          expect(msg).to.eql("Invalid input syntax");
        });
    });
    it("PATCH ERROR returns 400 if the body on the request contains more than just inc_votes", () => {
      return request(app)
        .patch("/api/comments/1")
        .expect(400)
        .send({ inc_votes: 1, Shaq: "legend" })
        .then(({ body: { msg } }) => {
          expect(msg).to.eql("body contains unexpected keys");
        });
    });
    it("DELETE returns 204 and no content", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204)
        .then(({ body }) => {
          expect(body).to.eql({});
        });
    });
    it("DELETE ERROR returns 404 if the comment_id does not exist", () => {
      return request(app)
        .delete("/api/comments/9999")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.eql("No comments found for comment_id 9999");
        });
    });
    it("DELETE ERROR returns 400 if the comment_id is in the incorrect format", () => {
      return request(app)
        .delete("/api/comments/NOT_AN_INTEGER")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).to.eql("Invalid input syntax");
        });
    });
    it("PUT ERROR returns invalid method on route", () => {
      return request(app)
        .put("/api/comments/1")
        .expect(405);
    });
  });
});
