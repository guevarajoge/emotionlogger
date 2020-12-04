const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const Helpers = require('./utils/helpers.js');

const port = 3000;

const pg = require('knex')({
  client: 'pg',
  version: '9.6',
  searchPath: ['knex', 'public'],
  connection: process.env.PG_CONNECTION_STRING
    ? process.env.PG_CONNECTION_STRING
    : 'postgres://example:example@localhost:5432/test',
});

const app = express();
http.Server(app);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.get('/test', (req, res) => {
  if (Object.keys(req.query).length > 0) {
    res.sendStatus(400);
  }
  res.status(204).send();
});

app.post('/test', (req, res) => {
  if (Object.keys(req.body).length > 0) {
    // console.log('server test');
    // console.log(req.body);
    res.sendStatus(201);
  }
  res.status(400).send();
});

//GET all records from storyblock table
app.get('/storyblock', async (req, res) => {
  const result = await pg
    .select(['uuid', 'content', 'story_id', 'created_at'])
    .from('storyblock');
  res.json({
    res: result,
  });
});

app.post('/storyblock', async (req, res) => {
  if (Object.keys(req.body).length > 0) {
    const uuid = Helpers.generateUUID();

    const result = await pg
      .insert({ ...req.body, uuid: uuid })
      .table('storyblock')
      .returning('*')
      .then((res) => {
        return res;
      });
    // console.log(result);
    res.send(result);
  } else {
    res.status(400).send();
  }
});

app.get('/', async (req, res) => {
  const result = await pg.select(['uuid', 'title', 'created_at']).from('story');
  res.json({
    res: result,
  });
});

app.post('/story', async (req, res) => {
  const uuid = Helpers.generateUUID();

  const result = await pg
    .insert({ ...req.body, uuid: uuid })
    .table('story')
    .returning('*')
    .then((res) => {
      return res;
    });
  // console.log(result);
  res.send(result);
});

app.get('/story/:uuid', async (req, res) => {
  const result = await pg
    .select(['uuid', 'title', 'created_at'])
    .from('story')
    .where({ uuid: req.params.uuid });
  res.json({
    res: result,
  });
});

async function initialiseTables() {
  await pg.schema.hasTable('storyblock').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('storyblock', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('content');
          table.string('story_id');
          table.integer('order');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table storyblock');
        });
    }
    // add record to storyblock table
    else {
      // console.log('created table STORYBLOCK');
      // const uuid = Helpers.generateUUID();
      // await pg.table('storyblock').insert({ uuid, content: `add record` });
    }
  });
  await pg.schema.hasTable('story').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('story', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('title');
          table.string('summary');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table story');
          for (let i = 0; i < 10; i++) {
            const uuid = Helpers.generateUUID();
            await pg
              .table('story')
              .insert({ uuid, title: `random element number ${i}` });
          }
        });
    }
  });
}
initialiseTables();

module.exports = app;
