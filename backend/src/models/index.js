import sequelize from '../db/sequelize.js';
import Department from './Department.js';
import Team from './Team.js';
import Employee from './Employee.js';
import Client from './Client.js';
import Task from './Task.js';
import RequestTemplate from './RequestTemplate.js';
import RegisteredClientRequest from './RegisteredClientRequest.js';
import NonRegisteredClientRequest from './NonRegisteredClientRequest.js';
import Application from './Application.js';
import Event from './Event.js';
import HiringOrOutsourcingRequest from './HiringOrOutsourcingRequest.js';
import BudgetAdjustmentRequest from './BudgetAdjustmentRequest.js';
import JobAdvertisement from './JobAdvertisement.js';
import FinancialSituationRequest from './FinancialSituationRequest.js';
import RequestPreferences from './RequestPreferences.js';
import ApplicationPreferences from './ApplicationPreferences.js';

// Department associations
Department.belongsTo(Employee, { as: 'manager' });
Department.hasMany(Team, { as: 'teams' });

// Team associations
Team.hasMany(Employee, { as: 'employees' });
// Team.belongsTo(Department, { as: 'department' });

// Employee associations
Employee.belongsTo(Team, { as: 'memberOfTeam' });
Employee.hasMany(Task, { as: 'tasks', foreignKey: 'assignedToId' });
Employee.hasMany(Task, { as: 'assignmentHistory', foreignKey: 'authorId' });

// Client associations
Client.hasMany(Application, { as: 'applications' });

// Task associations
Task.belongsTo(Employee, { as: 'author', foreignKey: 'authorId' });
Task.belongsTo(Employee, { as: 'assignedTo', foreignKey: 'assignedToId' });
Task.belongsTo(Application, { as: 'applicationReference' });

// Application associations
// Application.belongsTo(Client, { as: 'client' });
Application.hasMany(Task, { as: 'tasks' });
Application.belongsTo(ApplicationPreferences, { as: 'preferences' });

// Event associations
Event.belongsTo(Client, { as: 'client' });

// RegisteredClientRequest associations
RegisteredClientRequest.belongsTo(Client, { as: 'client' });

// NonRegisteredClientRequest associations
// (fields are embedded, no association)

// HiringOrOutsourcingRequest associations
HiringOrOutsourcingRequest.belongsTo(JobAdvertisement, { as: 'jobAdvertisement' });
HiringOrOutsourcingRequest.belongsTo(Department, { as: 'requestingDepartment' });

// BudgetAdjustmentRequest associations
BudgetAdjustmentRequest.belongsTo(Department, { as: 'requestingDepartment' });
BudgetAdjustmentRequest.belongsTo(Application, { as: 'applicationReference' });

// Sample data initialization function
const initSampleData = async () => {
    // Employees
    const alice = await Employee.create({
        name: 'Alice',
        email: 'alice@example.com',
        jobTitle: 'Manager'
    });
    const bob = await Employee.create({
        name: 'Bob',
        email: 'bob@example.com',
        jobTitle: 'Staff'
    });

    // Department with manager
    const itDept = await Department.create({ name: 'IT' });
    await itDept.setManager(alice);

    // Team under department (use hasMany side magic method since Team.belongsTo is commented out)
    const teamA = await Team.create({ name: 'Team A' });
    await itDept.addTeam(teamA);

    // Assign employees to team (Employee.belongsTo Team is active)
    await alice.setMemberOfTeam(teamA);
    await bob.setMemberOfTeam(teamA);

    // Client and application (use hasMany side magic method since Application.belongsTo Client is commented out)
    const client = await Client.create({
        name: 'Acme Corp',
        email: 'contact@acme.com',
        businessCode: 'AC123',
        address: '123 Main St',
        eligibleForDiscount: true
    });
    const app = await Application.create({
        eventType: 'Conference',
        description: 'Annual IT Conference',
        expectedNumberOfAttendees: 100,
        budget: 5000,
        startsOn: new Date(),
        endsOn: new Date(),
        otherNeeds: 'Projector',
        status: 'planning'
    });
    await client.addApplication(app);

    // Task authored by Alice, assigned to Bob, linked to the application
    const task = await Task.create({
        description: 'Setup venue',
        startsOn: new Date(),
        endsOn: new Date(),
        priority: 'high',
        status: 'pending'
    });
    await task.setAuthor(alice);
    await task.setAssignedTo(bob);
    await task.setApplicationReference(app);
}

export {
    sequelize,
    Department,
    Team,
    Employee,
    Client,
    Task,
    RequestTemplate,
    RegisteredClientRequest,
    NonRegisteredClientRequest,
    Application,
    Event,
    HiringOrOutsourcingRequest,
    BudgetAdjustmentRequest,
    JobAdvertisement,
    FinancialSituationRequest,
    RequestPreferences,
    ApplicationPreferences,
    initSampleData
};
