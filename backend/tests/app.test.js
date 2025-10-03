import request from 'supertest';
import { app, server } from '../src/app.js';

afterAll((done) => {
  server.close(done);
});

describe('GET /api/hello', () => {
  it('should return a hello message with a timestamp', async () => {
    const res = await request(app).get('/api/hello');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Hello from the backend!');
    expect(res.body).toHaveProperty('time');
    expect(typeof res.body.time).toBe('string');
  });
});


describe('GET /api/shouldFail', () => {
  it('should return a hello message with a timestamp', async () => {
    const res = await request(app).get('/api/shouldFail');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Hello from the backend!');
    expect(res.body).toHaveProperty('time');
    expect(typeof res.body.time).toBe('string');
  });
});
