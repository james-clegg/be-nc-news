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
  });
  describe("/users/:username", () => {
    it("GET should return a user object", () => {
      return request(app)
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(({ body: user }) => {
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
  });
  describe("/articles/:article_id", () => {
    it("GET should return an article object", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body: article }) => {
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
    it("PATCH returns 201 and the updated article", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 1 })
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
        .then(({ body: { msg } }) => {
          expect(msg).to.eql("No article found for article_id: 9999");
        });
    });
    it("PATCH ERROR returns 400 if article_id was in the incorrect format", () => {
      return request(app)
        .patch("/api/articles/NOT_AN_INTEGER")
        .send({ inc_votes: 1 })
        .then(({ body: { msg } }) => {
          expect(msg).eql("Invalid input syntax");
        });
    });
    it("PATCH ERROR returns 400 if there is no body on the request", () => {
      return request(app)
        .patch("/api/articles/1")
        .then(({ body: { msg } }) => {
          expect(msg).eql("No body on request");
        });
    });
    it("PATCH ERROR returns 400 if the body on the request is in the incorrect format", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: "banana" })
        .then(({ body: { msg } }) => {
          expect(msg).eql("Invalid input syntax");
        });
    });
    it("PATCH ERROR returns 400 if the body on the request contains more than just inc_votes", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 1, Shaq: "legend" })
        .then(({ body: { msg } }) => {
          expect(msg).eql("body contains unexpected keys");
        });
    });
  });
  describe("/api/articles/:article_id/comments", () => {
    it("POST returns 201 and returns the posted comment object", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({
          username: "butter_bridge",
          body: "insert witty catchphrase here"
        })
        .then(({ body: { comment } }) => {
          expect(comment[0]).to.have.all.keys(
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
        .then(({ body: { msg } }) => {
          expect(msg).eql("No body on request");
        });
    });
    it("POST ERROR returns 400 if the body on the request contains more than the necessary keys", () => {
      return request(app)
        .post("/api/articles/1/comments")
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
  });
});
