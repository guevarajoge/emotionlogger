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

/** DELETE:  delete emotion by uuid
 * @params uuid
 * @returns status 200 when OK, status 404 when not OK
 */
app.delete('/emotions/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  pg('emotions')
    .where({
      uuid: uuid,
    })
    .returning('*')
    .del()
    .then(function (result) {
      res.json(result);
      res.status(200).send();
    })
    .catch((e) => {
      console.log(e);
      res.status(404).send();
    });
});

/** PUT:  update emotion by uuid
 * @params uuid
 * @returns status 200 and updated emotion when OK, status 404 when not OK
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

/** GET:  get emotion by uuid
 * @params uuid
 * @returns status 200 and emotions of selected uuid when OK, status 404 when not OK
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

/** DELETE: delete selected emotion based on VALID ID number from emotions table
 * @params id
 * @returns deleted object
 */
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

/** GET:  get all emotions
 * @params
 * @returns object with all emotions entries
 */
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
});

/** POST:  add emotion
 * @params req.body
 * @returns status 201 and inserted emotion when OK, status 400 when not OK
 */
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
        console.log('Integration POST');
        console.log(result);
      });
  } else {
    res.status(400).send();
  }
});

/** POST:  add emotion
 * @params req.body
 * @returns body entry
 */
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

/** POST:  add 8 emotions
 * @params req.body
 * @returns body entries
 */
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

/** GET: join tables
 * @param
 * @returns
 */
app.get('/join', async (req, res) => {
  await pg
    .table('emotions')
    .join(
      'e_categories',
      pg.raw('emotions.joinbycategory::varchar'),
      pg.raw('e_categories.uuid::varchar')
    )
    .select('e_categories.*', 'emotions.*')
    .then((data) => {
      res.status(200);
      res.send(data);
    });
});
module.exports = app;
