const supertest = require('supertest');
const http = require('http');
const app = require('../server.js');
const request = supertest(app);
const Helpers = require('../utils/helpers');
const pg = require('../utils/DatabaseHelper');

describe('ENDTOEND TEST', () => {
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
  test('POST- emotions/ if emotion is added to the database', async () => {
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
  test('POST- emotions/ respond with 400 if no object is sent', async (done) => {
    try {
      const storyblockPost = await request.post('/emotions');
      expect(storyblockPost.status).toBe(400);
      done();
    } catch (error) {}
  });

  test('GET- emotions/:uuid/  if get request succeeds', async (done) => {
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

  test('PUT- emotions/ if put request succeeds', async (done) => {
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

  test('GET- join/  if get request of join succeeds', async (done) => {
    try {
      const response = await request.get(`/join`);
      expect(response.status).toBe(200);
      console.log('JOIN');
      console.log(response.body[0]);
      //   expect(response.body[0]['emotion']).toBeDefined();
      done();
    } catch (e) {
      if (e) console.log(e);
    }
  });

  test('DELETE- emotions/:uuid/ if emotion is removed from database when passing correct uuid', async () => {
    try {
      const response = await request.delete(`/emotions/${uuid}`);
      console.log('DELETE');
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].emotion).toStrictEqual('mad');
    } catch (error) {
      throw error;
    }
  });

  test('if record is deleted in db', async (done) => {
    try {
      const response = await pg.select('*').table('emotions').where({
        uuid: uuid,
      });
      expect(response.length).toBe(0);
      done();
    } catch (e) {
      if (e) console.log(e);
    }
  });
});
