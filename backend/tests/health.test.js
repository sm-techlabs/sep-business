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
      jobTitle: 'Manager',
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
  it('should return a 403 forbidden error', async () => {

    const token = generateToken({
      name: 'bob',
      jobTitle: 'Staff',
    });

    const res = await request(app)
      .get('/api/health')
      .set('Cookie', [`token=${token}`]); // manufacture a valid cookie for a role without access

    expect(res.statusCode).toEqual(403);
    expect(res.body.error || res.body.message).toMatch(/forbidden/i);
  });
});

describe('GET /api/health', () => {
  it('should return a 401 unauthorized error', async () => {

    const res = await request(app).get('/api/health'); // request without a cookie

    expect(res.statusCode).toEqual(401);
    expect(res.body.error || res.body.message).toMatch(/unauthorized/i);
  });
});



