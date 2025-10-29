import request from 'supertest';
import { app } from '../src/app.js';
import { initSampleData } from '../src/models/index.js';
import { sequelize } from '../src/models/index.js';
import { generateToken } from '../src/utils/jwt.js';

let managerToken;
let teamMemberToken;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await initSampleData();

  managerToken = generateToken({
    id: 6,
    name: 'Jack',
    jobTitle: 'Production Manager',
    teamId: null,
  });

  teamMemberToken = generateToken({
    id: 7,
    name: 'Magy',
    jobTitle: 'Decorating Architect',
    teamId: 1,
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('🧪 Teams API', () => {
  test('get subteams of department where user is manager', async () => {
    const res = await request(app)
      .get('/api/teams/my-subteams')
      .set('Cookie', [`token=${managerToken}`])
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
  test('get subteams of department where user is not manager', async () => {
    const res = await request(app)
      .get('/api/teams/my-subteams')
      .set('Cookie', [`token=${teamMemberToken}`])
    expect(res.statusCode).toBe(404);
  });
  test("get all members of user's team", async () => {
    const res = await request(app)
      .get('/api/teams/my-team-members')
      .set('Cookie', [`token=${teamMemberToken}`])
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
  test("get team members of user without a team", async () => {
    const res = await request(app)
      .get('/api/teams/my-team-members')
      .set('Cookie', [`token=${managerToken}`])
    expect(res.statusCode).toBe(404);
  });
});
