import request from 'supertest';
import { app, server } from '../src/app.js';

afterAll((done) => {
  server.close(done);
});

describe('GET /api/health', () => {
  it('should return a health message', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('time');
    expect(res.body).toHaveProperty('uptime');
    expect(typeof res.body.time).toBe('string');
  });
});

