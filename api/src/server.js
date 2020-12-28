const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const Helpers = require('./utils/helpers.js');

const pg = require('./utils/DatabaseHelper');

const port = 3000;

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

// ROOT
app.get('/', async (req, res) => {
  const result = await pg
    .select(['uuid', 'emotion', 'category_id'])
    .from('emotions');
  res.json({
    res: result,
  });
});

app.post('/story', async (req, res) => {
  const uuid = Helpers.generateUUID();

  const result = await pg

    .table('story')
    .insert({ uuid, title: `test`, summary: `testSum` })
    .then((res) => {
      return res;
    });
  // console.log(result);
  res.send(result);
});

// app.post('/story', async (req, res) => {
//   const uuid = Helpers.generateUUID();

//   const result = await pg
//     .insert({ ...req.body, uuid: uuid })
//     .table('story')
//     .returning('*')
//     .then((res) => {
//       return res;
//     });
//   // console.log(result);
//   res.send(result);
// });

app.get('/story/:uuid', async (req, res) => {
  const result = await pg
    .select(['uuid', 'title', 'created_at'])
    .from('story')
    .where({ uuid: req.params.uuid });
  res.json({
    res: result,
  });
});

module.exports = app;
