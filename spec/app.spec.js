process.env.NODE_ENV = "test";
const { expect } = require("chai");
const require = require("supertest");
const app = require("../app");
const connection = require('../db/connection')


describe('/api', () => {
  after(() => connection.destroy());
  beforeEach(() => {
    
  });
  it('', () => {
    
  });
});