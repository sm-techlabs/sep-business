import express from 'express';
import NonRegisteredClientRequest from '../models/NonRegisteredClientRequest.js';
import { sequelize } from '../models/index.js';
import RequestPreferences from '../models/RequestPreferences.js';
import RegisteredClientRequest from '../models/RegisteredClientRequest.js';
import Client from '../models/Client.js';
import RequestTemplate from '../models/RequestTemplate.js';
import Employee from '../models/Employee.js';
import { Op } from 'sequelize';
import { validate } from '../services/validation.js';
import { nonRegisteredRequestSchema, registeredRequestSchema } from '../schemas/request.js';
import { authorize } from '../services/authorization.js';
import createHandlerWrapper from '../utils/createHandlerWrapper.js';
import { NotFoundError, UnauthorizedError } from '../utils/errors.js';
import { verifyToken } from '../utils/jwt.js';

const router = express.Router();

/**
 * 🧩 Create new Event Request route
 */
router.post(
    '/unregistered', 
    authorize, 
    validate(nonRegisteredRequestSchema),
    createHandlerWrapper(async (req) => {
        const {name, jobTitle} = verifyToken(req.cookies.token)
        const createdBy = await Employee.findOne({ where: { name, jobTitle } });
        if (!createdBy) {
            throw new NotFoundError('Employee not found');
        }
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
            await newReq.setCreatedBy(createdBy.id, { transaction: t });
            return newReq.id
        });
        return { id, message: `Event Request #${id} created successfully!` }
    })
);

router.post(
    '/registered',
    authorize,
    validate(registeredRequestSchema),
    createHandlerWrapper(async (req) => {
        const {name, jobTitle} = verifyToken(req.cookies.token)
        const createdBy = await Employee.findOne({ where: { name, jobTitle } });
        if (!createdBy) {
            throw new NotFoundError('Employee not found');
        }
        const clientRecordNumber = req.body.recordNumber;
        const client = await Client.findOne({ where: { id: clientRecordNumber } });
        if (!client) {
            throw new NotFoundError('Invalid Client Record Number');
        }
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
                await newReq.setCreatedBy(createdBy.id, { transaction: t });
                return newReq.id
            });
            return { id, message: `Event Request #${id} created successfully!` }
    })
);

router.get(
    '/',
    authorize,
    createHandlerWrapper(async (req) => {
        // Query params
        const {
            page = '1',
            pageSize = '20',
            sortBy = 'createdAt',
            sortOrder = 'DESC',
            type, // 'registered' | 'non_registered'
            status, // comma-separated
            eventType,
            clientId,
            startsFrom,
            endsTo,
            minBudget,
            maxBudget,
            createdById,
        } = req.query;

    const pg = Math.max(parseInt(String(page), 10) || 1, 1);
    const size = Math.min(Math.max(parseInt(String(pageSize), 10) || 20, 1), 100);

    // Whitelist sort columns
    const sortable = new Set(['id', 'createdAt', 'updatedAt', 'startsOn', 'endsOn', 'estimatedBudget', 'status']);
    const orderCol = sortable.has(String(sortBy)) ? String(sortBy) : 'createdAt';
    const orderDir = String(sortOrder).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const where = {};
        if (type === 'registered' || type === 'non_registered') {
            where.type = type;
        }
        if (status) {
            const statuses = String(status)
                .split(',')
                .map(s => s.trim())
                .filter(Boolean);
            if (statuses.length) where.status = { [Op.in]: statuses };
        }
        if (eventType) {
            where.eventType = { [Op.like]: `%${eventType}%` };
        }
        if (clientId) {
            const cid = Number(clientId);
            if (!Number.isNaN(cid)) where.clientId = cid;
        }
        if (startsFrom) {
            where.startsOn = { ...(where.startsOn || {}), [Op.gte]: new Date(String(startsFrom)) };
        }
        if (endsTo) {
            where.endsOn = { ...(where.endsOn || {}), [Op.lte]: new Date(String(endsTo)) };
        }
        if (minBudget) {
            where.estimatedBudget = { ...(where.estimatedBudget || {}), [Op.gte]: Number(minBudget) };
        }
        if (maxBudget) {
            where.estimatedBudget = { ...(where.estimatedBudget || {}), [Op.lte]: Number(maxBudget), ...(where.estimatedBudget || {}) };
        }
        if (createdById) {
            const cbid = Number(createdById);
            if (!Number.isNaN(cbid)) {
                where.createdById = cbid;
            }
        }

        const include = [
            { model: RequestPreferences, as: 'preferences', attributes: { exclude: ['createdAt', 'updatedAt'] } },
            { model: Client, as: 'client', attributes: ['id', 'name', 'email', 'businessCode', 'address'] },
            { model: Employee, as: 'createdBy', attributes: ['id', 'name', 'email', 'jobTitle'] },
        ];

        const { rows, count } = await RequestTemplate.findAndCountAll({
            where,
            include,
            limit: size,
            offset: (pg - 1) * size,
            order: [[orderCol, orderDir]],
        });

        return {
            data: rows,
            page: pg,
            pageSize: size,
            total: count,
            totalPages: Math.ceil(count / size) || 1,
        };
    })
)

export default router;
