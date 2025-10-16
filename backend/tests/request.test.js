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

describe('🧪 Event Request API', () => {
  test('creates a new non-registered event request', async () => {
    const res = await request(app)
      .post('/api/request/unregistered')
      .send({
        eventType: 'some_event',
        startsOn: new Date(),
        endsOn: new Date(),
        estimatedBudget: 1000,
        name: 'John Doe',
        email: 'john@example.com',
        businessCode: 'XYZ123',
        address: '123 Main St',
        preferences: {
          decorations: true,
          parties: false,
          photosOrFilming: true,
          breakfastLunchDinner: false,
          softHotDrinks: true
        },
        expectedNumberOfAttendees: 50,
      });

    expect(res.statusCode).toBe(200);
  });
});

describe('🧪 Event Request API', () => {
  test('creates a new registered event request', async () => {
    const res = await request(app)
      .post('/api/request/registered')
      .send({
        eventType: 'some_event',
        startsOn: new Date(),
        endsOn: new Date(),
        estimatedBudget: 1000,
        recordNumber: 1,
        preferences: {
          decorations: true,
          parties: false,
          photosOrFilming: true,
          breakfastLunchDinner: false,
          softHotDrinks: true
        },
        expectedNumberOfAttendees: 75,
      });

    expect(res.statusCode).toBe(200);
  });
  
  test('creates a new registered event request with invalid Client Record number', async () => {
    const res = await request(app)
      .post('/api/request/registered')
      .send({
        eventType: 'some_event',
        startsOn: new Date(),
        endsOn: new Date(),
        estimatedBudget: 1000,
        recordNumber: 999, // Invalid record number
        preferences: {
          decorations: true,
          parties: false,
          photosOrFilming: true,
          breakfastLunchDinner: false,
          softHotDrinks: true
        },
        expectedNumberOfAttendees: 75,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/Invalid Client Record Number/i);
  });
  
  test('creates a new registered event request with invalid body', async () => {
    const res = await request(app)
      .post('/api/request/registered')
      .send({});

    expect(res.statusCode).toBe(400);
    // Validate error payload shape from validation middleware
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toHaveProperty('type', 'ValidationError');
    expect(res.body.error).toHaveProperty('details');
  });
});
