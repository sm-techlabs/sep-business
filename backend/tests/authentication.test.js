import request from 'supertest';
import { app } from '../src/app.js';
import { initSampleData } from '../src/models/index.js';
import { sequelize } from '../src/models/index.js';

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await initSampleData();
});

afterAll(async () => {
  await sequelize.close();
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
