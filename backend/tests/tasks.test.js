import request from 'supertest';
import { app } from '../src/app.js';
import { initSampleData } from '../src/models/index.js';
import { sequelize } from '../src/models/index.js';
import { generateToken } from '../src/utils/jwt.js';

let creatorToken;

beforeAll(async () => {
    await sequelize.sync({ force: true });
    await initSampleData();

    creatorToken = generateToken({
        "id": 6,
        "name": "Jack",
        "jobTitle": "Production Manager",
        "teamId": null 
    });
});

afterAll(async () => {
    await sequelize.close();
});

describe('🧪 Task API', () => {
    test('creates a new task', async () => {
        const res = await request(app)
            .post('/api/tasks/')
            .set('Cookie', [`token=${creatorToken}`])
            .send({
                startsOn: new Date(),
                endsOn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // one week later
                title: 'Implement Feature X',
                description: 'Develop and integrate Feature X into the existing system.',
                comments: 'High priority task',
                priority: 'High',
                applicationId: 1,
                subteamId: 1,
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(`Task #${res.body.id} created successfully`);
    });

    test('gets task history', async () => {
        const res = await request(app)
            .get('/api/tasks/')
            .set('Cookie', [`token=${creatorToken}`])
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    test('gets task by ID', async () => {
        const res = await request(app)
            .get('/api/tasks/1')
            .set('Cookie', [`token=${creatorToken}`])
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', 1);
    });

    test('updates task by ID', async () => {
        const startsOn = new Date();
        const endsOn = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // two weeks later
        const res = await request(app)
            .put('/api/tasks/1')
            .set('Cookie', [`token=${creatorToken}`])
            .send({
                subteamId: 1,
                applicationId: 1,
                startsOn,
                endsOn,
                title: 'Implement Feature Y',
                description: 'Develop and integrate Feature Y into the existing system.',
                comments: 'High priority task',
                priority: 'High',
            });
        console.warn(res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(`Task #1 updated successfully!`);

        const getRes = await request(app)
            .get('/api/tasks/1')
            .set('Cookie', [`token=${creatorToken}`])
        expect(getRes.statusCode).toBe(200);
        expect(getRes.body).toHaveProperty('id', 1);
        expect(getRes.body).toHaveProperty('startsOn', startsOn.toISOString());
        expect(getRes.body).toHaveProperty('endsOn', endsOn.toISOString());
        expect(getRes.body).toHaveProperty('title', 'Implement Feature Y');
        expect(getRes.body).toHaveProperty('description', 'Develop and integrate Feature Y into the existing system.');
        expect(getRes.body).toHaveProperty('comments', 'High priority task');
        expect(getRes.body).toHaveProperty('priority', 'High');
        expect(getRes.body).toHaveProperty('subteamId', 1);
    });
});
