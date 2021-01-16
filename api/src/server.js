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

/**  update disaster by uuid
 * @params uuid
 * @returns status 200 and updated disaster when OK, status 404 when not OK
 */
app.put('/emotions', async (req, res) => {
  const uuid = req.body.uuid;
  const dataToUpdate = req.body;
  pg('emotions')
    .where({
      uuid: uuid,
    })
    .update(dataToUpdate)
    .returning('*')
    .then(function (result) {
      console.log(result);
      res.json(result);
      res.status(200).send();
    })
    .catch((e) => {
      console.log(e);
      res.status(404).send();
    });
});

/**  get disaster by type
 * @params type
 * @returns status 200 and disasters of selected type when OK, status 404 when not OK
 */
app.get('/emotions/:uuid', async (req, res) => {
  pg('emotions')
    .select('*')
    .where({
      uuid: req.params.uuid,
    })
    .then((result) => {
      res.json(result);
      res.status(200).send();
    })
    .catch((e) => {
      console.log(e);
      res.status(404).send();
    });
});

//DELETE
//DELETE selected entry based on VALID ID number from emotions table
//.where('id',<your valid id number>)
app.delete('/emotions-down', async (req, res) => {
  const result = await pg
    .table('emotions')
    .where('id', '1')
    .del(['id', 'emotion'], { includeTriggerModifications: true })
    .then((res) => {
      return res;
    });
  console.log('DELETE 1 emotion entry');
  console.log(result);
  res.send(result);
});

//READ
//GET emotions - endpoint
app.get('/emotions', async (req, res) => {
  const result = await pg
    .select([
      'id',
      'uuid',
      'emotion',
      'category_id',
      'created_at',
      'updated_at',
    ])
    .from('emotions');
  res.json({
    res: result,
  });
  // console.log('show first entry with all columns');
  // console.log(result[0]);
});

// CREATE
//POST emotions - endpoint TO BE TESTED
app.post('/emotions', async (req, res) => {
  const data = req.body[0];
  if (Object.keys(req.body).length > 0) {
    const result = await pg

      .table('emotions')
      .insert(data)
      .returning('*')
      .then(function (result) {
        res.status(201);
        res.json(result).send();
      });
    console.log(result);
    // res.send(result);
  } else {
    res.status(400).send();
  }
});

// app.post('/emotions', async (req, res) => {
//   if (Object.keys(req.body).length > 0) {
//     const uuid = Helpers.generateUUID();

//     const result = await pg
//       .insert({ ...req.body, uuid: uuid })
//       .table('emotions')
//       .returning('*')
//       .then((res) => {
//         return res;
//       });
//     console.log(result);
//     res.send(result);
//   } else {
//     res.status(400).send();
//   }
// });

// adds 1 entry to emotions table
//POST add emotions
app.post('/emotions-1', async (req, res) => {
  const uuid = Helpers.generateUUID();
  const result = await pg

    .insert({ uuid, emotion: `exited`, category_id: `1` })
    .table('emotions')
    .returning('*')
    .then((res) => {
      return res;
    });
  console.log('add 1 emotion entry');
  console.log(result);
  res.send(result);
});

// adds 8 entries to the emotions table
//POST add emotions
app.post('/emotions-8', async (req, res) => {
  const uuid = Helpers.generateUUID();
  const result = await pg

    .table('emotions')
    .insert([
      { uuid, emotion: `joy`, category_id: `1` },
      { uuid, emotion: `whaaat`, category_id: `4` },
      { uuid, emotion: `love`, category_id: `1` },
      { uuid, emotion: `lonely`, category_id: `2` },
      { uuid, emotion: `annoyed`, category_id: `3` },
      { uuid, emotion: `hopeless`, category_id: `2` },
      { uuid, emotion: `mad`, category_id: `3` },
      { uuid, emotion: `peace`, category_id: `1` },
    ])
    .returning('*')
    .then((res) => {
      return res;
    });
  console.log('add 8 emotion entry');
  console.log(result);
  res.send(result);
});

/**
 * Initial enpoints
 * they have only testing purpose via the integration test
 */
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

module.exports = app;
