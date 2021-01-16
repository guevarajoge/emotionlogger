const supertest = require('supertest');
const http = require('http');
const app = require('../server.js');
const request = supertest(app);
const Helpers = require('../utils/helpers');

// adds one entry to emotions table
// POST /emotions Test endpoint
const pg = require('knex')({
  client: 'pg',
  version: '9.6',
  searchPath: ['knex', 'public'],
  connection: process.env.PG_CONNECTION_STRING
    ? process.env.PG_CONNECTION_STRING
    : 'postgres://example:example@localhost:5432/test',
});

describe('POST/ emotions endpoint', () => {
  let uuid = Helpers.generateUUID();
  const emoEntry = [
    {
      uuid: uuid,
      emotion: 'exited',
      category_id: '1',
    },
    {
      e_category: 'happy',
    },
  ];
  test('if emotion is added to the database', async () => {
    try {
      const response = await request.post('/emotions').send(emoEntry);
      expect(response.status).toBe(201);
      expect(response.body[0]['id']).toBeDefined();
      expect(response.body[0]['uuid']).toBeDefined();
      expect(response.body[0]['emotion']).toBeDefined();
      expect(response.body[0]['category_id']).toBeDefined();
      uuid = response.body[0].uuid;
    } catch (error) {
      throw error;
    }
  });
  test('respond with 400 if no object is sent', async (done) => {
    try {
      const storyblockPost = await request.post('/emotions');
      expect(storyblockPost.status).toBe(400);
      done();
    } catch (error) {}
  });

  test('if get request succeeds', async (done) => {
    try {
      const response = await request.get(`/emotions/${uuid}`);
      expect(response.status).toBe(200);
      expect(response.body).not.toBeNull();
      expect(response.body[0]['uuid']).toBeDefined();
      expect(response.body[0]['emotion']).toStrictEqual('exited');
      expect(response.body[0]['category_id']).toStrictEqual('1');
      done();
    } catch (e) {
      if (e) console.log(e);
    }
  });

  test('if put request succeeds', async (done) => {
    try {
      const response = await request.put(`/emotions`).send({
        uuid: uuid,
        emotion: 'mad',
      });
      expect(response.status).toBe(200);
      expect(response.body[0]).toHaveProperty('emotion', 'mad');
      done();
    } catch (e) {
      if (e) console.log(e);
    }
  });

  test('if get request of join succeeds', async (done) => {
    try {
      const response = await request.get(`/join`);
      expect(response.status).toBe(200);
      console.log('HERE');
      console.log(response.body);
      //   expect(response.body[0]['emotion']).toBeDefined();
      done();
    } catch (e) {
      if (e) console.log(e);
    }
  });

  //   test('if emotion is removed from database when passing correct uuid', async () => {
  //     try {
  //       const response = await request.delete(`/emotions/${uuid}`);
  //       // console.log('HERE');
  //       // console.log(response.body);
  //       //   expect(response.status).toBe(200);
  //       //   expect(response.body).toHaveLength(1);
  //       //    expect(response.body[0].fatalities).toStrictEqual('22');
  //       //   expect(response.body[0].emotion).toStrictEqual('mad');
  //     } catch (error) {
  //       throw error;
  //     }
  //   });
});
