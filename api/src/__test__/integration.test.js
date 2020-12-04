const supertest = require('supertest');
const http = require('http');

const app = require('./../server.js');
const request = supertest(app);
const Helpers = require('../utils/helpers');

describe('check GET /storyblock ', () => {
  test('check that GET /storyblock exist ', async (done) => {
    try {
      await request
        .get('/storyblock')
        .expect(200)
        .then((res) => {
          // console.log(res.body.res[0]);
        });
      done();
    } catch (error) {
      console.log(error);
    }
  });
  test('check that GET/storyblock return all results & that all columns are defined ', async (done) => {
    try {
      const waitRequest = await request.get('/storyblock');
      expect(waitRequest.body).not.toBeNull();
      expect(waitRequest.body.res[0]['uuid']).toBeDefined();
      expect(waitRequest.body.res[0]['content']).toBeDefined();
      expect(waitRequest.body.res[0]['story_id']).toBeDefined();
      expect(waitRequest.body.res[0]['created_at']).toBeDefined();
      done();
    } catch (error) {
      console.log(error);
    }
  });
  test('check that GET/storyblock  "noexisting"  column is false  ', async (done) => {
    try {
      const waitRequest = await request.get('/storyblock');
      expect(waitRequest.body.res[0]['noexisting']).toBeFalsy();
      done();
    } catch (error) {
      console.log(error);
    }
  });
});

describe('POST/ test storyblock table', () => {
  test('if user adds record with body', async (done) => {
    try {
      await request
        .post('/storyblock')
        .send({ content: 'NEW Test ', story_id: 2 })
        .expect(200);
      done();
    } catch (error) {}
  });
  test('respond with 400 if no object is sent', async (done) => {
    try {
      const storyblockPost = await request.post('/storyblock');
      expect(storyblockPost.status).toBe(400);
      done();
    } catch (error) {}
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
