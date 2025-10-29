import request from 'supertest';
import { app } from '../src/app.js';
import { initSampleData } from '../src/models/index.js';
import { sequelize } from '../src/models/index.js';
import { generateToken } from '../src/utils/jwt.js';

let managerToken;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await initSampleData();

  managerToken = generateToken({
    id: 6,
    name: 'Jack',
    jobTitle: 'Production Manager',
    teamId: null,
});
  
});

afterAll(async () => {
  await sequelize.close();
});

describe('🧪 Application API', () => {
  
  test('gets application history', async () => {
    const res = await request(app)
      .get('/api/applications/')
      .set('Cookie', [`token=${managerToken}`])
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

});
