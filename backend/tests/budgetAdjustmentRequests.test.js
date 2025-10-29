import request from 'supertest';
import { app } from '../src/app.js';
import { initSampleData } from '../src/models/index.js';
import { sequelize } from '../src/models/index.js';
import { generateToken } from '../src/utils/jwt.js';

let token;

beforeAll(async () => {
    await sequelize.sync({ force: true });
    await initSampleData();

    token = generateToken({
        "id": 14,
        "name": "Natalie",
        "jobTitle": "Service Manager",
        "teamId": null 
    });
});

afterAll(async () => {
    await sequelize.close();
});

describe('🧪 Budget Adjustment Request API', () => {
    test('creates a new budget adjustment request', async () => {
        const res = await request(app)
            .post('/api/budget-adjustment-requests/')
            .set('Cookie', [`token=${token}`])
            .send({
                applicationId: 1,
                requiredAmount: 2000,
                reason: 'Need additional budget for marketing activities',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(`Budget Adjustment Request #${res.body.id} created successfully!`);
    });

    test('gets budget adjustment request history', async () => {
        const res = await request(app)
            .get('/api/budget-adjustment-requests/')
            .set('Cookie', [`token=${token}`])
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    test('gets budget adjustment request by ID', async () => {
        const res = await request(app)
            .get('/api/budget-adjustment-requests/1')
            .set('Cookie', [`token=${token}`])
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', 1);
    });

    test('updates budget adjustment request by ID', async () => {
        const res = await request(app)
            .put('/api/budget-adjustment-requests/1')
            .set('Cookie', [`token=${token}`])
            .send({
                applicationId: 1,
                requiredAmount: 2500,
                reason: 'Increased budget needed for marketing and promotions',
                status: 'Accepted',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(`Budget Adjustment Request #1 updated successfully!`);

        const getRes = await request(app)
            .get('/api/budget-adjustment-requests/1')
            .set('Cookie', [`token=${token}`])
        expect(getRes.statusCode).toBe(200);
        expect(getRes.body).toHaveProperty('id', 1);
        expect(getRes.body).toHaveProperty('requiredAmount', 2500);
        expect(getRes.body).toHaveProperty('reason', 'Increased budget needed for marketing and promotions');
        expect(getRes.body).toHaveProperty('status', 'Accepted');
    });

    test('delete budget adjustment request by ID', async () => {
        const res = await request(app)
            .delete('/api/budget-adjustment-requests/1')
            .set('Cookie', [`token=${token}`])
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(`Budget Adjustment Request #1 deleted successfully!`);
    });
});
