const request = require('supertest');
const { app, server } = require('../server/server');

describe('GET /students', () => {
  it('should return a list of students', async () => {
    const response = await request(app).get('/students');  // ✅ fix here
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });


});
  afterAll(() => {
    server.close();  // ✅ Close server after tests
  });
