import request from 'supertest';
import { app } from '../src/app.js';
import { initSampleData } from '../src/models/index.js';
import { sequelize } from '../src/models/index.js';
import { generateToken } from '../src/utils/jwt.js';

let scsoToken;
let csoToken;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await initSampleData();

  scsoToken = generateToken({
    id: 4,
    name: 'Janet',
    jobTitle: 'Senior Customer Service Officer',
    teamId: null,
  });
  
  csoToken = generateToken({
    id: 5,
    name: 'Sarah',
    jobTitle: 'Customer Service Officer',
    teamId: null,
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('🧪 Event Request API', () => {
  test('creates a new non-registered event request', async () => {
    const res = await request(app)
      .post('/api/event-requests/nonregistered')
      .set('Cookie', [`token=${csoToken}`])
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
      .post('/api/event-requests/registered')
      .set('Cookie', [`token=${csoToken}`])
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
      .post('/api/event-requests/registered')
      .set('Cookie', [`token=${csoToken}`])
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

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/Invalid Client Record Number/i);
  });
  
  test('creates a new registered event request with invalid body', async () => {
    const res = await request(app)
      .post('/api/event-requests/registered')
      .set('Cookie', [`token=${csoToken}`])
      .send({});

    expect(res.statusCode).toBe(400);
    // Validate error payload shape from validation middleware
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toHaveProperty('type', 'ValidationError');
    expect(res.body.error).toHaveProperty('details');
  });
  
  test('gets event request history', async () => {
    const res = await request(app)
      .get('/api/event-requests/')
      .set('Cookie', [`token=${scsoToken}`])
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
  
  test('gets event request by ID', async () => {
    const res = await request(app)
      .get('/api/event-requests/1')
      .set('Cookie', [`token=${scsoToken}`])
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  test('tries to update registered event request from wrong enpoint', async () => {
    const res = await request(app)
      .put('/api/event-requests/nonregistered/1')
      .set('Cookie', [`token=${csoToken}`])
      .send({
        eventType: 'updated_event_type',
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
    expect(res.statusCode).toBe(422);
  });
  
  test('tries to update non-registered event request from wrong enpoint', async () => {
    const res = await request(app)
      .put('/api/event-requests/registered/2')
      .set('Cookie', [`token=${csoToken}`])
      .send({
        eventType: 'updated_event_type',
        startsOn: new Date(),
        endsOn: new Date(),
        estimatedBudget: 1000,
        name: 'John Doe',
        email: 'johndoe@kth.se',
        businessCode: 'KTH123',
        address: '123 KTH Street',
        preferences: {
          decorations: true,
          parties: false,
          photosOrFilming: true,
          breakfastLunchDinner: false,
          softHotDrinks: true
        },
        expectedNumberOfAttendees: 75,
      });
    expect(res.statusCode).toBe(422);
  });

  test('updates registered event request by ID', async () => {
    const startsOn = new Date();
    const endsOn = new Date();
    const pref = {
      decorations: true,
      parties: false,
      photosOrFilming: true,
      breakfastLunchDinner: false,
      softHotDrinks: true
    }
    const res = await request(app)
      .put('/api/event-requests/registered/1')
      .set('Cookie', [`token=${csoToken}`])
      .send({
        eventType: 'updated_event_type',
        startsOn: startsOn,
        endsOn: endsOn,
        estimatedBudget: 1000,
        recordNumber: 1,
        preferences: pref,
        expectedNumberOfAttendees: 75,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(`Event Request #1 updated successfully!`);

    const getRes = await request(app)
      .get('/api/event-requests/1')
      .set('Cookie', [`token=${scsoToken}`])
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body).toHaveProperty('id', 1);
    expect(new Date(getRes.body.startsOn)).toEqual(startsOn);
    expect(new Date(getRes.body.endsOn)).toEqual(endsOn);
    expect(getRes.body).toHaveProperty('eventType', 'updated_event_type');
    expect(getRes.body).toHaveProperty('estimatedBudget', 1000);
    expect(getRes.body).toHaveProperty('expectedNumberOfAttendees', 75);
    expect(getRes.body).toHaveProperty('clientId', 1);
    expect(getRes.body).toHaveProperty('preferences');
    expect(getRes.body.preferences.decorations).toBe(pref.decorations);
    expect(getRes.body.preferences.parties).toBe(pref.parties);
    expect(getRes.body.preferences.photosOrFilming).toBe(pref.photosOrFilming);
    expect(getRes.body.preferences.breakfastLunchDinner).toBe(pref.breakfastLunchDinner);
    expect(getRes.body.preferences.softHotDrinks).toBe(pref.softHotDrinks);
  });
  
  test('updates non-registered event request by ID', async () => {
    const startsOn = new Date();
    const endsOn = new Date();
    const pref = {
      decorations: true,
      parties: false,
      photosOrFilming: true,
      breakfastLunchDinner: false,
      softHotDrinks: true
    }
    const res = await request(app)
      .put('/api/event-requests/nonregistered/2')
      .set('Cookie', [`token=${csoToken}`])
      .send({
        eventType: 'updated_event_type',
        name: 'John Doe',
        email: 'johndoe@kth.se',
        businessCode: 'KTH123',
        address: '123 KTH Street',
        startsOn: startsOn,
        endsOn: endsOn,
        estimatedBudget: 1000,
        preferences: pref,
        expectedNumberOfAttendees: 75,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(`Event Request #2 updated successfully!`);

    const getRes = await request(app)
      .get('/api/event-requests/2')
      .set('Cookie', [`token=${scsoToken}`])
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body).toHaveProperty('id', 2);
    expect(new Date(getRes.body.startsOn)).toEqual(startsOn);
    expect(new Date(getRes.body.endsOn)).toEqual(endsOn);
    expect(getRes.body).toHaveProperty('name', 'John Doe');
    expect(getRes.body).toHaveProperty('email', 'johndoe@kth.se');
    expect(getRes.body).toHaveProperty('businessCode', 'KTH123');
    expect(getRes.body).toHaveProperty('address', '123 KTH Street');
    expect(getRes.body).toHaveProperty('eventType', 'updated_event_type');
    expect(getRes.body).toHaveProperty('estimatedBudget', 1000);
    expect(getRes.body).toHaveProperty('expectedNumberOfAttendees', 75);
    expect(getRes.body).toHaveProperty('preferences');
    expect(getRes.body.preferences.decorations).toBe(pref.decorations);
    expect(getRes.body.preferences.parties).toBe(pref.parties);
    expect(getRes.body.preferences.photosOrFilming).toBe(pref.photosOrFilming);
    expect(getRes.body.preferences.breakfastLunchDinner).toBe(pref.breakfastLunchDinner);
    expect(getRes.body.preferences.softHotDrinks).toBe(pref.softHotDrinks);
  });

  test('set event request as approved', async () => {
    const res = await request(app)
      .patch('/api/event-requests/1/approve')
      .set('Cookie', [`token=${scsoToken}`])
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(`Event Request #1 approved successfully by Janet!`);
  });
  
  test('set event request as rejected', async () => {
    const res = await request(app)
      .patch('/api/event-requests/1/reject')
      .set('Cookie', [`token=${scsoToken}`])
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(`Event Request #1 rejected by Janet.`);
  });

  test('delete event request by ID', async () => {
    const res = await request(app)
      .delete('/api/event-requests/1')
      .set('Cookie', [`token=${scsoToken}`])
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(`Event Request #1 deleted successfully!`);
  });
});
