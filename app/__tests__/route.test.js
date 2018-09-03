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

describe('statistics monitoring route', () => {
  afterEach(() => {
    app.server.close();
  });

  test('should respond with a 200 with no query parameters', () => {
    return request(app)
      .get('/statistics/monitoring')
      .expect('Content-Type', /html/)
      .expect(200)
      .then(response => {
        expect(response.text).toMatch(
          /<table class=\"table table-striped\"><thead><tr><th class=\".col-xs-1\"><\/th><\/tr><\/thead><tbody>/
        );
      });
  });

  test('should respond with a 200 with valid query parameters', () => {
    return request(app)
      .get('/statistics/monitoring?hei=testschool&interval=1997,1998,1999')
      .expect('Content-Type', /html/)
      .expect(200)
      .then(response => {
        expect(response.text).toMatch(
          /<table class=\"table table-striped\"><thead><tr><th class=\".col-xs-4\">testschool<\/th><th class=\".col-xs-4\">1997<\/th><th class=\".col-xs-4\">1998<\/th><th class=\".col-xs-4\">1999<\/th><\/tr><\/thead><tbody><tr><td>Takbelopp<\/td><td>470 457<\/td><td>483 863<\/td><td>517 677<\/td><td>565 144<\/td><td>575 054<\/td><\/tr><\/tbody><\/table>/
        );
      });
  });
});