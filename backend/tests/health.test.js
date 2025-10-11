import request from 'supertest';
import { app } from '../src/app.js';
import { sequelize } from '../src/models/index.js';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
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

