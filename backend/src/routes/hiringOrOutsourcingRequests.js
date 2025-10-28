import express from 'express';
import { Department, HiringOrOutsourcingRequest, sequelize } from '../models/index.js';
import Employee from '../models/Employee.js';
import { validate } from '../services/validation.js';
import { authorize } from '../services/authorization.js';
import createHandlerWrapper from '../utils/createHandlerWrapper.js';
import { NotFoundError } from '../utils/errors.js';
import { verifyToken } from '../utils/jwt.js';
import { parseFilters } from '../utils/parseFilters.js';
import { createHiringOrOutsourcingRequestSchema } from '../schemas/hiringOrOutsourcingRequest.js';

const router = express.Router();

router.post(
    '/', 
    authorize, 
    validate(createHiringOrOutsourcingRequestSchema),
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

        const id = await sequelize.transaction(async t => {
            const newReq = await HiringOrOutsourcingRequest.create({
                contractType: req.body.contractType,
                jobTitle: req.body.jobTitle,
                minYearsOfExperience: req.body.minYearsOfExperience,
                jobDescription: req.body.jobDescription,
                status: 'Active',
            }, { transaction: t });
            await newReq.setRequestingDepartment(department, { transaction: t });
            return newReq.id;
        });

        return { id, message: `Hiring/Outsourcing Request #${id} created successfully!` }
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
      'status',
    ]);
    const orderCol = sortable.has(String(sortBy)) ? String(sortBy) : 'createdAt';
    const orderDir = String(sortOrder).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    // Build filters dynamically
    const where = parseFilters(req.query, [
      'status',
      'requestingDepartmentId',
    ]);

    const include = [
        { model: Department, as: 'requestingDepartment', attributes: ['id', 'name'] },
    ];

    const { rows, count } = await HiringOrOutsourcingRequest.findAndCountAll({
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

    const request = await HiringOrOutsourcingRequest.findByPk(requestId, {
      include: [
        { model: Department, as: 'requestingDepartment', attributes: ['id', 'name'] },
      ],
    });

    if (!request) {
      throw new NotFoundError('Hiring/Outsourcing Request not found');
    }

    return request;
  })
);

router.put(
    '/:id',
    authorize,
    createHandlerWrapper(async (req) => {
        const requestId = req.params.id;
        const request = await HiringOrOutsourcingRequest.findByPk(requestId);
        if (!request) {
            throw new NotFoundError('Hiring/Outsourcing Request not found');
        }
            
        await sequelize.transaction(async (t) => {
            await request.update({
                status: req.body.status,
                contractType: req.body.contractType,
                jobTitle: req.body.jobTitle,
                minYearsOfExperience: req.body.minYearsOfExperience,
                jobDescription: req.body.jobDescription,
            }, { transaction: t });
        });

        return { message: `Hiring/Outsourcing Request #${requestId} updated successfully!` };
    })
);

router.patch(
    '/:id',
    authorize,
    createHandlerWrapper(async (req) => {
        const requestId = req.params.id;
        const request = await HiringOrOutsourcingRequest.findByPk(requestId);
        if (!request) {
            throw new NotFoundError('Hiring/Outsourcing Request not found');
        }

        const department = await Department.findByPk(request.body.requestingDepartmentId);
        if (!department) {
            throw new NotFoundError('Requesting Department not found');
        }
            
        await sequelize.transaction(async (t) => {
            await request.update({
                contractType: req.body.contractType,
                minYearsOfExperience: req.body.minYearsOfExperience,
                jobTitle: req.body.jobTitle,
                jobDescription: req.body.jobDescription,
                status: req.body.status,
            }, { transaction: t });

            await request.setRequestingDepartment(department, { transaction: t });
        });

        return { message: `Hiring/Outsourcing Request #${requestId} updated successfully!` };
    })
);


// DELETE /recruitment-requests/:id
router.delete(
    '/:id',
    authorize,
    createHandlerWrapper(async (req) => {
        const requestId = req.params.id;
        const request = await HiringOrOutsourcingRequest.findByPk(requestId);
        if (!request) {
            throw new NotFoundError('Recruitment Request not found');
        }
        await sequelize.transaction(async (t) => {
            await request.destroy({ transaction: t });
        });
        return { message: `Recruitment Request #${requestId} deleted successfully!` };
    })
);

export default router;
