import express from 'express';
import { sequelize } from '../models/index.js';
import Employee from '../models/Employee.js';
import { validate } from '../services/validation.js';
import { authorize } from '../services/authorization.js';
import createHandlerWrapper from '../utils/createHandlerWrapper.js';
import { NotFoundError } from '../utils/errors.js';
import { parseFilters } from '../utils/parseFilters.js';
import Task from '../models/Task.js';
import { createTaskSchema, updateTaskSchema } from '../schemas/task.js';
import Application from '../models/Application.js';
import Team from '../models/Team.js';

const router = express.Router();

/**
 * 🧩 Create new Task route
 */
router.post(
    '/', 
    authorize, 
    validate(createTaskSchema),
    createHandlerWrapper(async (req) => {
        const application = await Application.findByPk(req.body.applicationId);
        if (!application) {
            throw new NotFoundError('Application not found');
        }
        const subteam = await Team.findByPk(req.body.subteamId);
        if (!subteam) {
            throw new NotFoundError('Subteam not found');
        }
        const id = await sequelize.transaction(async (t) => {
            const task = await Task.create({
                startsOn: req.body.startsOn,
                endsOn: req.body.endsOn,
                title: req.body.title,
                description: req.body.description,
                comments: req.body.comments,
                priority: req.body.priority,
                status: 'Pending',
            }, { transaction: t });

            // Optionally associate with application
            await task.setApplication(application, { transaction: t });
            await task.setSubteam(subteam, { transaction: t });

            return task.id;
        });
        return { id, message: `Task #${id} created successfully` };
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
      'startsOn',
      'endsOn',
      'priority',
      'status',
    ]);
    const orderCol = sortable.has(String(sortBy)) ? String(sortBy) : 'createdAt';
    const orderDir = String(sortOrder).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    // Build filters dynamically
    const where = parseFilters(req.query, [
      'priority',
      'status',
      'startsOn',
      'endsOn',
      'subteamId',
      'applicationId',
    ]);

    const include = [
      { model: Application, as: 'applicationReference', attributes: { exclude: ['createdAt', 'updatedAt', 'id'] } },
      { model: Team, as: 'subteam', attributes: ['id', 'name'] },
      { model: Employee, as: 'assignedTo', attributes: ['id', 'name', 'email', 'jobTitle'] },
    ];

    const { rows, count } = await Task.findAndCountAll({
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
    const taskId = req.params.id;

    const task = await Task.findByPk(taskId, {
      include: [
        { model: Application, as: 'applicationReference', attributes: { exclude: ['createdAt', 'updatedAt'] } },
        { model: Team, as: 'subteam', attributes: ['id', 'name'] },
        { model: Employee, as: 'assignedTo', attributes: ['id', 'name', 'email', 'jobTitle'] },
      ],
    });

    if (!task) {
      throw new NotFoundError('Task not found');
    }

    return task;
  })
);


router.put(
    '/:id',
    authorize,
    validate(updateTaskSchema),
    createHandlerWrapper(async (req) => {
        const taskId = req.params.id;
        const task = await Task.findByPk(taskId);
        if (!task) {
            throw new NotFoundError('Task not found');
        }
            
        await sequelize.transaction(async (t) => {
            await task.update({
                startsOn: req.body.startsOn,
                endsOn: req.body.endsOn,
                title: req.body.title,
                description: req.body.description,
                comments: req.body.comments,
                priority: req.body.priority,
                status: req.body.status,
            }, { transaction: t });

            if (req.body.applicationId) {
                const application = await Application.findByPk(req.body.applicationId, { transaction: t });
                if (!application) {
                    throw new NotFoundError('Application not found');
                }
                await task.setApplication(application, { transaction: t });
            }

            if (req.body.subteamId) {
                const subteam = await Team.findByPk(req.body.subteamId, { transaction: t });
                if (!subteam) {
                    throw new NotFoundError('Subteam not found');
                }
                await task.setSubteam(subteam, { transaction: t });
            }

            if (req.body.assignedToId) {
                const employee = await Employee.findByPk(req.body.assignedToId, { transaction: t });
                if (!employee) {
                    throw new NotFoundError('Employee not found');
                }
                await task.setAssignedTo(employee, { transaction: t });
            }
        });

        return { message: `Task #${taskId} updated successfully!` };
    })
);

// DELETE /tasks/:id
router.delete(
    '/:id',
    authorize,
    createHandlerWrapper(async (req) => {
        const taskId = req.params.id;
        const task = await Task.findByPk(taskId);
        if (!task) {
            throw new NotFoundError('Task not found');
        }
        await sequelize.transaction(async (t) => {
            await task.destroy({ transaction: t });
        });
        return { message: `Task #${taskId} deleted successfully!` };
    })
);

export default router;
