const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("should return an empty array when passed an empty array", () => {
    const input = [];
    const result = formatDates(input);
    const expected = [];
    expect(result).to.eql(expected);
  });
  it("should return an array with a converted date format when passed a unix date", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const result = formatDates(input);
    expect(result[0].created_at).to.eql(new Date(1542284514171));
  });
  it("should return an array of multiple article objects with their created_at values converted to a js date object", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: 1416140514171
      }
    ];
    const result = formatDates(input);
    expect(result[0].created_at instanceof Date).to.be.true;
    expect(result[1].created_at instanceof Date).to.be.true;
  });
  it("should return an array of multiple comment objects with their created_at values converted to a js date object", () => {
    const input = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932
      },
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        created_by: "grumpy19",
        votes: 7,
        created_at: 1478813209256
      }
    ];
    const result = formatDates(input);
    expect(result[0].created_at instanceof Date).to.be.true;
    expect(result[1].created_at instanceof Date).to.be.true;
  });
});

describe("makeRefObj", () => {
  it("should return an empty object when passed an empty array", () => {
    const input = [];
    const result = makeRefObj(input);
    const expected = {};
    expect(result).to.eql(expected);
  });
  it("should return an object with a key of the given article title and a value of the given article id", () => {
    const input = [{ article_id: 1, title: "banana" }];
    const result = makeRefObj(input);
    const expected = { banana: 1 };
    expect(result).to.eql(expected);
  });
  it("should create a reference object when given an array with multiple objects", () => {
    const input = [
      { article_id: 1, title: "banana" },
      { article_id: 86, title: "grape" }
    ];
    const result = makeRefObj(input);
    const expected = { banana: 1, grape: 86 };
    expect(result).to.eql(expected);
  });
});

describe("formatComments", () => {
  it("should return an empty array when passed an empty array", () => {
    expect(formatComments([])).to.eql([]);
  });
  it("should return a correctly formatted comment when passed one comment", () => {
    const inputArray = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932
      }
    ];
    const inputObj = { tickle122: 1 };
    const result = formatComments(inputArray, inputObj);
    const expected = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        article_id: 1,
        author: "tickle122",
        votes: -1,
        created_at: new Date(1468087638932)
      }
    ];
    expect(result).to.eql(expected);
  });
  it("should return a correctly formatted array when passed multiple objects", () => {
    const inputArray = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932
      },
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        created_by: "grumpy19",
        votes: 7,
        created_at: 1478813209256
      }
    ];
    const inputObj = {
      tickle122: 1,
      grumpy19: 2
    };
    const result = formatComments(inputArray, inputObj);
    const expected = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        article_id: 1,
        author: "tickle122",
        votes: -1,
        created_at: new Date(1468087638932)
      },
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        article_id: 2,
        author: "grumpy19",
        votes: 7,
        created_at: new Date(1478813209256)
      }
    ];
    expect(result).to.eql(expected);
  });
});
