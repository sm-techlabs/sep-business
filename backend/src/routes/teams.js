import express from 'express';
import Employee from '../models/Employee.js';
import { authorize } from '../services/authorization.js';
import createHandlerWrapper from '../utils/createHandlerWrapper.js';
import { NotFoundError } from '../utils/errors.js';
import { verifyToken } from '../utils/jwt.js';

const router = express.Router();

router.get(
  '/my-subteams',
  authorize,
  createHandlerWrapper(async (req) => {
    const { id: requesterId } = verifyToken(req.cookies.token);

    const employee = await Employee.findByPk(requesterId);
    if (!employee) throw new NotFoundError('Employee not found');

    const team = await employee.getMemberOfTeam();
    if (!team) throw new NotFoundError('Team not found for employee');
    const department = await team.getDepartment();
    if (!department) throw new NotFoundError('Department not found for team');
    
    const subteams = await department.getTeams();
    if (!subteams) throw new NotFoundError('No subteams found for department');

    return subteams.map(s => ({name: s.name, id: s.id}));
  })
);

export default router;
