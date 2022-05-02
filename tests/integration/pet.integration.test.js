const request = require('supertest');

const {restore} = require('../../src/utils/fileHelpers');
const app = require('../../src/app');
const endFunction = require('./helpers/supertest-jasmine');

describe('test', () => {
  afterEach(() => {
    restore();
  });

  it('hello', (done) => {
    request(app)
      .get('/pets')
      .expect(200)
      .end(endFunction(done));
  });
});