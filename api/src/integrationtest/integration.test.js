const supertest = require('supertest');
const http = require('http');
const app = require('../server.js');
const request = supertest(app);
const Helpers = require('../utils/helpers');
const pg = require('../utils/DatabaseHelper');

describe('POST/ emotions endpoint', () => {
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

  test('if user adds record with body', async (done) => {
    try {
      await request.post('/emotions').send(emoEntry).expect(201);
      done();
    } catch (error) {}
  });
  test('respond with 400 if no object is sent', async (done) => {
    try {
      const storyblockPost = await request.post('/emotions');
      expect(storyblockPost.status).toBe(400);
      done();
    } catch (error) {}
  });
});

/*
// POST /emotions-1. Test if endpoint exist
describe('POST/ emotions-1 endpoint', () => {
  test('if endpoint exist', async (done) => {
    try {
      await request.post('/emotions-1').expect(200);
      done();
    } catch (error) {}
  });
});
// POST /emotions-8. Test if endpoint exist & that 8 new entries were added by the server
describe('POST/ emotions-8 endpoint', () => {
  test('if endpoint exist & that 8 new entries where added', async (done) => {
    try {
      const emo = await request.post('/emotions-8');
      expect(emo.body).toHaveLength(8);
      done();
    } catch (error) {}
  });
});
*/

describe('check GET /emotions ', () => {
  test('check that GET /emotions exist ', async (done) => {
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
  test('check that GET/emotions return all results & that all columns are defined ', async (done) => {
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
  test('check that GET/emotions  "noexisting"  column is false  ', async (done) => {
    try {
      const waitRequest = await request.get('/emotions');
      expect(waitRequest.body.res[0]['noexisting']).toBeFalsy();
      done();
    } catch (error) {
      console.log(error);
    }
  });
});

describe('GET /test end point', () => {
  test('check respond with 204', async (done) => {
    try {
      await request
        .get('/test')
        .expect(204)
        .then((res) => {
          expect(res.body).toStrictEqual({});
          done();
        });
    } catch (e) {
      if (e) {
        console.log(e);
        done(e);
        done();
      }
    }
  });
  test('check if responds with 400 when send data', async (done) => {
    try {
      await request
        .get('/test')
        .query({ id: null })
        .expect(400)
        .then((res) => {
          // console.log(res);
          done();
        });
    } catch (e) {
      if (e) {
        console.log(e);
        done(e);
        done();
      }
    }
  });
});

describe('POST /test end point', () => {
  test('respond with 201 if got object', async (done) => {
    try {
      await request
        .post('/test')
        .send({ data: [] })
        .expect(201)
        .then((res) => {
          done();
        });
    } catch (e) {
      if (e) {
        console.log(e);
        done(e);
        done();
      }
    }
  });
  test('respond with 400 if send no object', async (done) => {
    try {
      await request
        .post('/test')
        .expect(400)
        .then((res) => {
          done();
        });
    } catch (e) {
      if (e) {
        console.log(e);
        done(e);
        done();
      }
    }
  });
});
