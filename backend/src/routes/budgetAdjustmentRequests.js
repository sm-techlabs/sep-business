import express from 'express';
import NonRegisteredClientRequest from '../models/NonRegisteredClientRequest.js';
import { BudgetAdjustmentRequest, Department, sequelize } from '../models/index.js';
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
import { BadRequestError, NotFoundError, UnprocessableEntityError } from '../utils/errors.js';
import { verifyToken } from '../utils/jwt.js';
import { REQUEST_TEMPLATE_STATUSES } from '../constants/enums.js';
import { parseFilters } from '../utils/parseFilters.js';
import { createBudgetAdjustmentRequestSchema } from '../schemas/budgetAdjustmentRequest.js';
import Application from '../models/Application.js';

const router = express.Router();

/**
 * 🧩 Create new Event Request route
 */
router.post(
    '/', 
    authorize, 
    validate(createBudgetAdjustmentRequestSchema),
    createHandlerWrapper(async (req) => {
        const { id: requesterId } = verifyToken(req.cookies.token);
        
        const employee = await Employee.findByPk(requesterId);
        if (!employee) throw new NotFoundError('Employee not found');

        const team = await employee.getMemberOfTeam();
        const department = (
            team ? await team.getDepartment() :
            await Department.findOne({
                where: { managerId: employee.id },
            })
        )
        if (!department) throw new NotFoundError('Department not found for employee');
        const application = await Application.findByPk(req.body.applicationId);
        if (!application) {
            throw new NotFoundError('Application not found');
        }

        const id = await sequelize.transaction(async t => {
            const newReq = await BudgetAdjustmentRequest.create({
                requiredAmount: req.body.requiredAmount,
                reason: req.body.reason,
                status: 'Active',
            }, { transaction: t });
            await newReq.setApplicationReference(application, { transaction: t });
            await newReq.setRequestingDepartment(department, { transaction: t });
            return newReq.id;
        });

        return { id, message: `Budget Adjustment Request #${id} created successfully!` }
    })
);


router.get(
  '/',
  authorize,
  createHandlerWrapper(async (req) => {
    const {
      page = '1',
      pageSize = '20',
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = req.query;

    const pg = Math.max(parseInt(page, 10) || 1, 1);
    const size = Math.min(Math.max(parseInt(pageSize, 10) || 20, 1), 100);

    // Whitelist sorting columns
    const sortable = new Set([
      'id',
      'createdAt',
      'updatedAt',
      'requiredAmount',
      'status',
    ]);
    const orderCol = sortable.has(String(sortBy)) ? String(sortBy) : 'createdAt';
    const orderDir = String(sortOrder).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    // Build filters dynamically
    const where = parseFilters(req.query, [
      'status',
      'requestingDepartmentId',
      'applicationId',
    ]);

    const include = [
        { model: Department, as: 'requestingDepartment', attributes: ['id', 'name'] },
        { model: Application, as: 'applicationReference', attributes: ['id'] },
    ];

    const { rows, count } = await BudgetAdjustmentRequest.findAndCountAll({
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
);

router.get(
  '/:id',
  authorize,
  createHandlerWrapper(async (req) => {
    const requestId = req.params.id;

    const request = await BudgetAdjustmentRequest.findByPk(requestId, {
      include: [
        { model: Department, as: 'requestingDepartment', attributes: ['id', 'name'] },
        { model: Application, as: 'applicationReference', attributes: ['id'] },
      ],
    });

    if (!request) {
      throw new NotFoundError('Budget Adjustment Request not found');
    }

    return request;
  })
);

router.put(
    '/:id',
    authorize,
    createHandlerWrapper(async (req) => {
        const requestId = req.params.id;
        const request = await BudgetAdjustmentRequest.findByPk(requestId);
        if (!request) {
            throw new NotFoundError('Budget Adjustment Request not found');
        }

        const application = await Application.findByPk(req.body.applicationId);
        if (!application) {
            throw new NotFoundError('Application not found');
        }

        const department = await Department.findByPk(request.body.requestingDepartmentId);
        if (!department) {
            throw new NotFoundError('Requesting Department not found');
        }
            
        await sequelize.transaction(async (t) => {
            await request.update({
                requiredAmount: req.body.requiredAmount,
                reason: req.body.reason,
                status: req.body.status,
            }, { transaction: t });

            await request.setApplicationReference(application, { transaction: t });
            await request.setRequestingDepartment(department, { transaction: t });
        });

        return { message: `Budget Adjustment Request #${requestId} updated successfully!` };
    })
);

// DELETE /budget-adjustment-requests/:id
router.delete(
    '/:id',
    authorize,
    createHandlerWrapper(async (req) => {
        const requestId = req.params.id;
        const request = await BudgetAdjustmentRequest.findByPk(requestId);
        if (!request) {
            throw new NotFoundError('Event Request not found');
        }
        await sequelize.transaction(async (t) => {
            await request.destroy({ transaction: t });
        });
        return { message: `Budget Adjustment Request #${requestId} deleted successfully!` };
    })
);

export default router;
