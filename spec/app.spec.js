process.env.NODE_ENV = "test";
const { expect } = require("chai");
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
        .then(({ body: user }) => {
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
  describe('/articles/:article_id', () => {
    it('GET should return an article object', () => {
      return request(app)
      .get('/api/articles/')
    });
  });
});
