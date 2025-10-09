import request from 'supertest';
import { app, server } from '../src/app.js';

afterAll((done) => {
  server.close(done);
});

const LoginEndpoint = '/api/authentication/login';

describe(`POST ${LoginEndpoint}`, () => {
  it('should be rejected due to invalid credentials', async () => {
    const res = (
      await request(app)
      .post(LoginEndpoint)
      .send({ username: 'wrong', password: 'wrong' })
      .set('Content-Type', 'application/json')
    );
    expect(res.statusCode).toEqual(401);
  });
  it('should be rejected due to missing credentials', async () => {
    const res = await request(app).post(LoginEndpoint);
    expect(res.statusCode).toEqual(400);
  });
  it('should be rejected due to invalid method', async () => {
    const res = await request(app).post(LoginEndpoint);
    expect(res.statusCode).toEqual(405);
  });
});

