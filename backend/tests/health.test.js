import request from 'supertest';
import { app, initServer } from '../src/app.js';

let server;

beforeAll(async () => {
  // Start server and DB before tests
  server = await initServer();
});

afterAll(async () => {
  // Clean shutdown after tests
  if (server) await server.close();
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

