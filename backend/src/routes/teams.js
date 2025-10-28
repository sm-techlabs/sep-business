import express from 'express';
import Employee from '../models/Employee.js';
import { authorize } from '../services/authorization.js';
import createHandlerWrapper from '../utils/createHandlerWrapper.js';
import { NotFoundError } from '../utils/errors.js';
import { verifyToken } from '../utils/jwt.js';
import Department from '../models/Department.js';
import Team from '../models/Team.js';

const router = express.Router();

router.get(
  '/my-subteams',
  authorize,
  createHandlerWrapper(async (req) => {
    const { id: requesterId } = verifyToken(req.cookies.token);

    const employee = await Employee.findByPk(requesterId);
    if (!employee) throw new NotFoundError('Employee not found');
    
    const department = await Department.findOne({
      where: { managerId: employee.id },
    });
    if (!department) throw new NotFoundError('Department not found for manager');
    
    const subteams = await department.getTeams();
    if (!subteams) throw new NotFoundError('No subteams found for department');

    return subteams.map(s => ({name: s.name, id: s.id}));
  })
);

router.get(
  '/my-team-members',
  authorize,
  createHandlerWrapper(async (req) => {
    const { id: requesterId } = verifyToken(req.cookies.token);

    // 1️⃣ Find the requester (Employee)
    const employee = await Employee.findByPk(requesterId);
    if (!employee) throw new NotFoundError('Employee not found');

    // 2️⃣ Get the team they belong to
    const team = await employee.getMemberOfTeam();

    if (!team) throw new NotFoundError('Employee is not assigned to any team');

    // 3️⃣ Get all members of that team
    const teamMembers = await team.getEmployees();

    // 4️⃣ Optionally, exclude the requester themself
    // const filtered = teamMembers.filter((m) => m.id !== employee.id);

    // 5️⃣ Return a clean response
    return teamMembers.map((m) => ({
      id: m.id,
      name: m.name,
      email: m.email,
      jobTitle: m.jobTitle,
      joinedOn: m.createdAt,
    }));
  })
);

export default router;
