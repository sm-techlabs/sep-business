import express from 'express';
import NonRegisteredClientRequest from '../models/NonRegisteredClientRequest.js';
import { sequelize } from '../models/index.js';
import RequestPreferences from '../models/RequestPreferences.js';
import RegisteredClientRequest from '../models/RegisteredClientRequest.js';
import Client from '../models/Client.js';
import { validate } from '../services/validation.js';
import { nonRegisteredRequestSchema, registeredRequestSchema } from '../schemas/request.js';
import { authorize } from '../services/authorization.js';

const router = express.Router();

/**
 * 🧩 Create new Event Request route
 */
router.post(
    '/unregistered', 
    authorize, 
    validate(nonRegisteredRequestSchema),
    async (req, res) => {
        try {
            const id = await sequelize.transaction(async t => {
                const reqPref = req.body.preferences;
                const pref = await RequestPreferences.create({
                    decorations: reqPref.decorations,
                    parties: reqPref.parties,
                    photosOrFilming: reqPref.photosOrFilming,
                    breakfastLunchDinner: reqPref.breakfastLunchDinner,
                    softHotDrinks: reqPref.softHotDrinks,
                }, { transaction: t });
                const newReq = await NonRegisteredClientRequest.create({
                    type: 'non_registered',
                    eventType: req.body.eventType,
                    startsOn: req.body.startsOn,
                    endsOn: req.body.endsOn,
                    status: 'Submitted',
                    estimatedBudget: req.body.estimatedBudget,
                    name: req.body.name,
                    email: req.body.email,
                    businessCode: req.body.businessCode,
                    address: req.body.address,
                    expectedNumberOfAttendees: req.body.expectedNumberOfAttendees,
                }, { transaction: t });
                await newReq.setPreferences(pref, { transaction: t });
                return newReq.id
            });
            res.status(200).json({ id });
        } catch (error) {
            console.error('Error creating non-registered client request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

router.post(
    '/registered',
    authorize,
    validate(registeredRequestSchema),
    async (req, res) => {
        const clientRecordNumber = req.body.recordNumber;
        const client = await Client.findOne({ where: { id: clientRecordNumber } });
        if (!client) {
            return res.status(400).json({ error: 'Invalid Client Record Number' });
        }
        try {
            const id = await sequelize.transaction(async t => {
                const reqPref = req.body.preferences;
                const pref = await RequestPreferences.create({
                    decorations: reqPref.decorations,
                    parties: reqPref.parties,
                    photosOrFilming: reqPref.photosOrFilming,
                    breakfastLunchDinner: reqPref.breakfastLunchDinner,
                    softHotDrinks: reqPref.softHotDrinks,
                }, { transaction: t });
                const newReq = await RegisteredClientRequest.create({
                    type: 'registered',
                    eventType: req.body.eventType,
                    startsOn: req.body.startsOn,
                    endsOn: req.body.endsOn,
                    status: 'Submitted',
                    estimatedBudget: req.body.estimatedBudget,
                    recordNumber: client.id,
                    expectedNumberOfAttendees: req.body.expectedNumberOfAttendees,
                }, { transaction: t });
                await newReq.setPreferences(pref, { transaction: t });
                return newReq.id
            });
            res.status(200).json({ id });
        } catch (error) {
            console.error('Error creating registered client request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

export default router;
