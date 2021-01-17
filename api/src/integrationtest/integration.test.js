const supertest = require('supertest');
const http = require('http');
const app = require('../server.js');
const request = supertest(app);
const Helpers = require('../utils/helpers');
const pg = require('../utils/DatabaseHelper');

describe('POST/ emotions/ endpoint', () => {
  let uuid = Helpers.generateUUID();
  const emoEntry = [
    {
      uuid: uuid,
      emotion: 'hopefull',
      category_id: 1,
    },
    {
      e_category: 'happy',
    },
  ];

  test('POST- emotions/ if user adds record with body', async (done) => {
    try {
      await request.post('/emotions').send(emoEntry).expect(201);
      done();
    } catch (error) {}
  });
  test('POST- emotions/ respond with 400 if no object is sent', async (done) => {
    try {
      const storyblockPost = await request.post('/emotions');
      expect(storyblockPost.status).toBe(400);
      done();
    } catch (error) {}
  });
});

describe('POST/ emotions-1', () => {
  test('Test if endpoint exist', async (done) => {
    try {
      await request.post('/emotions-1').expect(200);
      done();
    } catch (error) {}
  });
});
describe('POST- emotions-8/', () => {
  test('Test if endpoint exist & that 8 new entries were added by the server', async (done) => {
    try {
      const emo = await request.post('/emotions-8');
      expect(emo.body).toHaveLength(8);
      done();
    } catch (error) {}
  });
});

describe('GET- emotions/ ', () => {
  test('GET- check that emotions/ enpoint exist ', async (done) => {
    try {
      await request
        .get('/emotions')
        .expect(200)
        .then((res) => {});
      done();
    } catch (error) {
      console.log(error);
    }
  });
  test('GET- check that emotions/ enpoint return all results & that all columns are defined ', async (done) => {
    try {
      const waitRequest = await request.get('/emotions');

      console.log('show first entry with all columns');
      console.log(waitRequest.body.res[0]);

      expect(waitRequest.body).not.toBeNull();
      expect(waitRequest.body.res[0]['id']).toBeDefined();
      expect(waitRequest.body.res[0]['uuid']).toBeDefined();
      expect(waitRequest.body.res[0]['emotion']).toBeDefined();
      expect(waitRequest.body.res[0]['category_id']).toBeDefined();
      expect(waitRequest.body.res[0]['created_at']).toBeDefined();
      expect(waitRequest.body.res[0]['updated_at']).toBeDefined();
      done();
    } catch (error) {
      console.log(error);
    }
  });
  test('GET- check that emotions/ enpoint  "noexisting"  column is false  ', async (done) => {
    try {
      const waitRequest = await request.get('/emotions');
      expect(waitRequest.body.res[0]['noexisting']).toBeFalsy();
      done();
    } catch (error) {
      console.log(error);
    }
  });
});
