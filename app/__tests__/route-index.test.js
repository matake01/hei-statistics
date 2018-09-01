const request = require('supertest');

jest.mock('../statistics.js');

const app = require('../main.js');

describe('index route', () => {
  afterEach(() => {
    app.server.close();
  });

  test('should respond with a 200 with no query parameters', () => {
    return request(app)
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .then(response => {
        expect(response.text).toContain([]);
      });
  });
});
