import request from 'supertest';
import { app } from '../src/app.js';
import { initSampleData } from '../src/models/index.js';
import { sequelize } from '../src/models/index.js';
import { generateToken } from '../src/utils/jwt.js';

let managerToken;
let staffToken;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await initSampleData();

  managerToken = generateToken({
    name: 'alice',
    jobTitle: 'Manager',
  });

  staffToken = generateToken({
    name: 'bob',
    jobTitle: 'Staff',
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('🧪 Clients API', () => {
  test('attempts to get all clients', async () => {
    const res = await request(app)
      .get('/api/clients/')
      .set('Cookie', [`token=${managerToken}`])
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

  });
  test('attempt to read all clients without permissions', async () => {
    const res = await request(app)
      .get('/api/clients/')
      .set('Cookie', [`token=${staffToken}`])
    expect(res.statusCode).toBe(403);
  });
});
