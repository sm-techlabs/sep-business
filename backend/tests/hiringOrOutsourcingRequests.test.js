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

describe('🧪 Hiring or Outsourcing Request API', () => {
    test('creates a new hiring or outsourcing request', async () => {
        const res = await request(app)
            .post('/api/recruitment-requests/')
            .set('Cookie', [`token=${creatorToken}`])
            .send({
                contractType: 'Full Time',
                jobTitle: 'Software Engineer',
                minYearsOfExperience: 3,
                jobDescription: 'Responsible for developing and maintaining software applications.',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(`Hiring/Outsourcing Request #${res.body.id} created successfully!`);
    });

    test('gets hiring or outsourcing request history', async () => {
        const res = await request(app)
            .get('/api/recruitment-requests/')
            .set('Cookie', [`token=${creatorToken}`])
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    test('gets hiring or outsourcing request by ID', async () => {
        const res = await request(app)
            .get('/api/recruitment-requests/1')
            .set('Cookie', [`token=${creatorToken}`])
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', 1);
    });

    test('updates hiring or outsourcing request by ID', async () => {
        const res = await request(app)
            .put('/api/recruitment-requests/1')
            .set('Cookie', [`token=${creatorToken}`])
            .send({
                status: 'Accepted',
                contractType: 'Full Time',
                jobTitle: 'Software Engineer',
                minYearsOfExperience: 4,
                jobDescription: 'Responsible for developing and maintaining software applications.',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(`Hiring/Outsourcing Request #1 updated successfully!`);

        const getRes = await request(app)
            .get('/api/recruitment-requests/1')
            .set('Cookie', [`token=${creatorToken}`])
        expect(getRes.statusCode).toBe(200);
        expect(getRes.body).toHaveProperty('id', 1);
        expect(getRes.body).toHaveProperty('status', 'Accepted');
        expect(getRes.body).toHaveProperty('contractType', 'Full Time');
        expect(getRes.body).toHaveProperty('jobTitle', 'Software Engineer');
        expect(getRes.body).toHaveProperty('minYearsOfExperience', 4);
        expect(getRes.body).toHaveProperty('jobDescription', 'Responsible for developing and maintaining software applications.');
    });

    test('delete hiring or outsourcing request by ID', async () => {
        const res = await request(app)
            .delete('/api/recruitment-requests/1')
            .set('Cookie', [`token=${creatorToken}`])
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(`Recruitment Request #1 deleted successfully!`);
    });
});
