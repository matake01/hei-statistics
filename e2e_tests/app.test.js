const request = require('supertest');

const app = require('../app/main.js');

describe('statistics monitoring route', () => {
  afterEach(() => {
    app.server.close();
  });

  test('should respond with a 200 with valid query parameters', () => {
    return request(app)
      .get('/statistics/monitoring?hei=Chalmers%20tekniska%20högskola&interval=1998,1999,2000,2001,2002')
      .expect('Content-Type', /html/)
      .expect(200)
      .then(response => {
        expect(response.text)
        .toContain(
          `<thead>` +
          `<tr><th class=".col-xs-4">Chalmers tekniska högskola</th><th class=".col-xs-4">1998</th><th class=".col-xs-4">1999</th><th class=".col-xs-4">2000</th><th class=".col-xs-4">2001</th><th class=".col-xs-4">2002</th></tr>` +
          `</thead>` +
          `<tbody>` +
          `<tr><td>Takbelopp</td><td>470 457</td><td>483 863</td><td>517 677</td><td>565 144</td><td>575 054</td></tr>` +
          `<tr><td>Utfall HST och HPR totalsumma</td><td>444 090</td><td>456 380</td><td>475 889</td><td>522 321</td><td>573 676</td></tr>` +
          `<tr><td>Utgående balans anslagssparande</td><td>19 987</td><td>47 470</td><td>51 768</td><td>56 514</td><td>56 852</td></tr>` +
          `</tbody>`)
      });
  });
});
