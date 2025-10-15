import request from 'supertest';
import { app } from '../src/app.js';
import { sequelize } from '../src/models/index.js';
import { generateToken } from '../src/utils/jwt.js';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('GET /api/health', () => {
  it('should return a valid health message', async () => {

    const token = generateToken({
      name: 'alice',
      jobTitle: 'Manager', // This must match your RBAC rule names
    });

    const res = await request(app)
      .get('/api/health')
      .set('Cookie', [`token=${token}`]); // manufacture a valid cookie

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('time');
    expect(res.body).toHaveProperty('uptime');
    expect(typeof res.body.time).toBe('string');
  });
});

describe('GET /api/health', () => {
  it('should return an insufficient permissions error', async () => {

    const res = await request(app).get('/api/health'); // request without a cookie

    expect(res.statusCode).toEqual(403);
    expect(res.body.error || res.body.message).toMatch(/forbidden/i);
  });
});

