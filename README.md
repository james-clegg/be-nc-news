# Northcoders News API

This is an API used to interact with my Northcoders News application. The application itself consists of a number of tables for different topics, users, articles, and comments and there are a number of endpoints available to interact with these tables. The database is built through PSQL and interactions with the database are made with Knex.js.

## Hosted version

A hosted version of the app can be found [here.]([https://jc-nc-news.herokuapp.com/api/](https://jc-nc-news.herokuapp.com/api/))

## Cloning and installing

* First you will need to clone the repo
```bash
git clone https://github.com/james-clegg/be-nc-news.git
cd be-nc-news
```
* The following dependencies are provided for you: 
[cors ^2.8.5]([https://expressjs.com/en/resources/middleware/cors.html](https://expressjs.com/en/resources/middleware/cors.html))
[express ^4.17.1]([https://expressjs.com/](https://expressjs.com/))
[knex ^0.19.0]([http://knexjs.org/](http://knexjs.org/))
[pg ^7.11.0]([https://node-postgres.com/](https://node-postgres.com/))

So run npm install to install the dependencies
```bash
npm install
```
* In order to create and seed the database, however, there is one other file that is necessary to create. Please create a new file in the root directory called precisely 'knexfile.js'. The contents should be set out like this:

```bash
const ENV = process.env.NODE_ENV || 'development';
const { DB_URL } = process.env;

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  },
  migrations: {
    directory: './db/migrations'
  }
};

const customConfig = {
  production: {
    connection: `${DB_URL}?ssl=true`
  },
  development: {
    connection: {
      database: 'nc_news',
      user: '<YOUR-PG-USERNAME-HERE>', // LINUX ONLY
      password: '<YOUR-PG-PASSWORD-HERE>' // LINUX ONLY
    }
  },
  test: {
    connection: {
      database: 'nc_news_test',
      user: '<YOUR-PG-USERNAME-HERE>', // LINUX ONLY
      password: '<YOUR-PG-PASSWORD-HERE>' // LINUX ONLY
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
```

## Seeding databases

We can now set up our databases

```bash
npm run setup-dbs
```

This will have given us both development and test databases. In order to add our tables in both our development and test databases respectively, please run:

```bash
npm run migrate-latest
npm run migrate-latest-test
```

There are two sets of data in the data folder, in order to populate the respective databases, please run:

```bash
npm run seed
npm run seed-test
```

You should now have two complete databases with tables and data. 

## Testing

If you want to run the existing test, you will need to install the following dev dependencies:

[chai ^4.2.0](https://www.chaijs.com/api/bdd/)
[chai-sorted ^0.2.0](https://www.npmjs.com/package/chai-sorted)
[mocha ^6.1.4](https://mochajs.org/)
[supertest ^4.0.2](https://www.npmjs.com/package/supertest)

In order to run the tests, the following scripts are necessary: 

To run app.js tests:
```bash
npm test
```
To run utility function tests:
```bash
npm run test-utils
```
For visual testing you can also install nodemon: 
```bash
npm install nodemon -D
```
and then run it with:
```bash
npm run dev
```

## Other scripts

If you make any changes and need to rollback the migrations there are the following scripts available:

```bash
npm run migrate-rollback
npm run migrate-rollback-test
```

## Hosting

There are two scripts, previously unlisted, that allow hosting if needed:

To start your server:

```bash
npm start
```
To seed a production database:
```bash
npm run seed:prod
```
Please see hosting.md for instructions on hosting the app and database on heroku.

## Current endpoints

-   /api
    -   GET
        -   Serves up a json representation of all the available endpoints of the api.
-   /api/topics
    -   GET
        -   Serves an array of all topics:
            
              [
            {
            "slug": "football",
            "description": "Footie!"
            }
              ]
            
-   /api/artciles
    -   GET
        -   Serves an array of all articles and can take queries of author, topic, sort_by and order:
            
              [
            {
            "title": "Seafood substitutions are increasing",
            "topic": "cooking",
            "author": "weegembump",
            "body": "Text from the article..",
            "created_at": 1527695953341
            }
              ]
            
-   /api/users/:username
    -   GET
        -   A parametric endpoint of username serves a corresponing user object:
            
            {
            "username": "tickle122",
            "avatar_url": "https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg",
            "name": "Tom Tickle"
            }
            
-   /api/articles/:article_id
    -   GET
        -   A parametric endpoint of article_id serves a corresponding article object:
            
            {
            "article_id": 1,
            "title": "Running a Node App",
            "body": "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
            "votes": 44,
            "topic": "coding",
            "author": "jessjelly",
            "created_at": "2016-08-18T12:07:52.389Z",
            "comment_count": "8"
            }
            
    -   PATCH
        -   A parametric endpoint of article_id used for altering votes of specified article. Returns patched article:
            
            // example request body:
            {
            "inc_votes": 1
            }
            // example response:
            {
            "article_id": 1,
            "title": "Running a Node App",
            "body": "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
            "votes": 46,
            "topic": "coding",
            "author": "jessjelly",
            "created_at": "2016-08-18T12:07:52.389Z"
            }
            
-   /api/articles/:article_id/comments
    -   GET
        -   A parametric endpoint with an article_id serving an array of all comments relating to referenced article:
            
              [
            {
              "votes": 4,
              "author": "grumpy19",
              "created_at": "2017-11-20T08:58:48.322Z",
              "comment_id": 44,
              "body": "Error est qui id corrupti et quod enim accusantium minus. Deleniti quae ea magni officiis et qui suscipit non."
            },
            {
              "votes": 10,
              "author": "jessjelly",
              "created_at": "2017-07-31T08:14:13.076Z",
              "comment_id": 52,
              "body": "Consectetur deleniti sed. Omnis et dolore omnis aspernatur. Et porro accusantium. Tempora ullam voluptatum et rerum."
            }
             ]
            
    -   POST
        -   A parametric endpoint enabling posting of comments relating to specific articles. Responds with the posted comment object
            
            // example request body
            {
            "username": "butter_bridge",
            "body": "hello this is my first comment woop"
            }
            // example response
            "comment": {
            "comment_id": 301,
            "author": "tickle122",
            "article_id": 1,
            "votes": 0,
            "created_at": "2019-07-17T15:48:30.049Z",
            "body": "hello this is my first comment woop"
            }
            
-   /api/comments/comments_id:
    -   PATCH
        -   A parametric endpoint for changing comment vote count. Responds with updated comment object:
            
            // example request body:
            {
            "inv_votes": 4
            } 
            // example response
            {
            "comment_id": 1,
            "author": "tickle122",
            "article_id": 18,
            "votes": 9,
            "created_at": "2016-07-09T18:07:18.932Z",
            "body": "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus."
            }
            
    -   DELETE
        -   A parametric endpoint for deleting comments by their id. Responds 204 no content upon succefful deletion.