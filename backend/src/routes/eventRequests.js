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
import { BadRequestError, NotFoundError } from '../utils/errors.js';
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
                    expectedNumberOfAttendees: req.body.expectedNumberOfAttendees,
                }, { transaction: t });
                await newReq.setPreferences(pref, { transaction: t });
                await newReq.setCreatedBy(createdBy.id, { transaction: t });
                await newReq.setClient(client.id, { transaction: t });
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

router.get(
  '/:id',
  authorize,
  createHandlerWrapper(async (req) => {
    const requestId = req.params.id;

    const request = await RequestTemplate.findByPk(requestId, {
      include: [
        { model: RequestPreferences, as: 'preferences', attributes: { exclude: ['createdAt', 'updatedAt'] } },
        { model: Client, as: 'client', attributes: ['id', 'name', 'email', 'businessCode', 'address'] },
        { model: Employee, as: 'createdBy', attributes: ['id', 'name', 'email', 'jobTitle'] },
      ],
    });

    if (!request) {
      throw new NotFoundError('Event Request not found');
    }

    return request;
  })
);


router.put(
    '/:id',
    authorize,
    createHandlerWrapper(async (req) => {
        const requestId = req.params.id;
        const request = await RequestTemplate.findByPk(requestId);
        if (!request) {
            throw new NotFoundError('Event Request not found');
        }
        await sequelize.transaction(async (t) => {
            await request.update({
                eventType: req.body.eventType,
                startsOn: req.body.startsOn,
                endsOn: req.body.endsOn,
                status: req.body.status,
                estimatedBudget: req.body.estimatedBudget,
            }, { transaction: t });

            // If preferences are provided, update them
            const preferences = req.body.preferences;
            if (preferences) {
                let pref = await request.getPreferences({ transaction: t });
                if (!pref) {
                    pref = await RequestPreferences.create({}, { transaction: t });
                    await request.setPreferences(pref, { transaction: t });
                }
                await pref.update({
                    decorations: preferences.decorations,
                    parties: preferences.parties,
                    photosOrFilming: preferences.photosOrFilming,
                    breakfastLunchDinner: preferences.breakfastLunchDinner,
                    softHotDrinks: preferences.softHotDrinks,
                }, { transaction: t });
            }

            // If clientId is provided (for registered requests), update the association
            if (req.body.clientId && request.type === 'registered') {
                const client = await Client.findByPk(req.body.clientId, { transaction: t });
                if (!client) {
                    throw new NotFoundError('Client not found');
                }
                await request.setClient(client, { transaction: t });
            }
        });

        return { message: `Event Request #${requestId} updated successfully!` };
    })
);

// DELETE /eventRequests/:id
router.delete(
    '/:id',
    authorize,
    createHandlerWrapper(async (req) => {
        const requestId = req.params.id;
        const request = await RequestTemplate.findByPk(requestId);
        if (!request) {
            throw new NotFoundError('Event Request not found');
        }
        await sequelize.transaction(async (t) => {
            // // Delete associated preferences first
            // const pref = await request.getPreferences({ transaction: t });
            // if (pref) {
            //     await pref.destroy({ transaction: t });
            // }
            // Then delete the request itself
            await request.destroy({ transaction: t });
        });
        return { message: `Event Request #${requestId} deleted successfully!` };
    })
);

router.patch(
  '/:id/approve',
  authorize,
  createHandlerWrapper(async (req) => {
    const requestId = req.params.id;
    const { id: reviewerId, name, jobTitle } = verifyToken(req.cookies.token);

    const request = await RequestTemplate.findByPk(requestId);
    if (!request) throw new NotFoundError('Event Request not found');

    if (request.status !== 'Submitted') {
      throw new BadRequestError('Only submitted requests can be approved.');
    }

    await sequelize.transaction(async (t) => {
      await request.update(
        {
          status: 'Approved',
          approvedById: reviewerId,
          approvedByRole: jobTitle,
          approvedAt: new Date(),
        },
        { transaction: t }
      );
    });

    return { message: `Event Request #${requestId} approved successfully by ${name}!` };
  })
);

router.patch(
  '/:id/reject',
  authorize,
  createHandlerWrapper(async (req) => {
    const requestId = req.params.id;
    const { reason } = req.body;
    const { id: reviewerId, name, jobTitle } = verifyToken(req.cookies.token);

    const request = await RequestTemplate.findByPk(requestId);
    if (!request) throw new NotFoundError('Event Request not found');

    if (request.status !== 'Submitted') {
      throw new BadRequestError('Only submitted requests can be rejected.');
    }

    await sequelize.transaction(async (t) => {
      await request.update(
        {
          status: 'Rejected',
          rejectedById: reviewerId,
          rejectedByRole: jobTitle,
          rejectedAt: new Date(),
          rejectionReason: reason || null,
        },
        { transaction: t }
      );
    });

    return { message: `Event Request #${requestId} rejected by ${name}.` };
  })
);

export default router;
