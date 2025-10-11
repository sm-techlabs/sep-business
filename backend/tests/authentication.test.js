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

describe('🧪 Authentication API', () => {
  test('rejects login with missing credentials', async () => {
    const res = await request(app)
      .post('/api/authentication/login')
      .send({ username: '', password: '' });

    expect(res.statusCode).toBe(400);
    expect(res.body.error || res.body.message).toMatch(/invalid/i);
  });

  test('rejects login with invalid credentials', async () => {
    const res = await request(app)
      .post('/api/authentication/login')
      .send({ username: 'wrong', password: 'credentials' });

    expect(res.statusCode).toBe(401);
    expect(res.body.error || res.body.message).toMatch(/invalid/i);
  });

  test('rejects login with correct username and incorrect password', async () => {
    const res = await request(app)
      .post('/api/authentication/login')
      .send({ username: 'alice', password: 'wrong' });

    expect(res.statusCode).toBe(401);
    expect(res.body.error || res.body.message).toMatch(/invalid/i);
  });

  test('logs in successfully with valid credentials', async () => {
    const res = await request(app)
      .post('/api/authentication/login')
      .send({ username: 'alice', password: 'test' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/success/i);
  });

  test('denies access to protected route without login', async () => {
  const res = await request(app).get('/api/authentication/validate');
  expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/missing|unauthorized/i);
  });
});
