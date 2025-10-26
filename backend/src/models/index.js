import sequelize from '../db/sequelize.js';
import bcrypt from 'bcrypt';
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

// Task associations
Task.belongsTo(Employee, { as: 'author', foreignKey: 'authorId' });
Task.belongsTo(Employee, { as: 'assignedTo', foreignKey: 'assignedToId' });
Task.belongsTo(Application, { as: 'applicationReference' });

// Application associations
// Application.belongsTo(Client, { as: 'client' });
Application.hasMany(Task, { as: 'tasks' });
Application.belongsTo(ApplicationPreferences, { as: 'preferences' });
Application.belongsTo(Client, { as: 'client' });

RequestTemplate.belongsTo(RequestPreferences, { as: 'preferences' });
RequestTemplate.belongsTo(Employee, { as: 'createdBy' });
RequestTemplate.belongsTo(Client, { as: 'client' });

// Event associations
Event.belongsTo(Client, { as: 'client' });

// RegisteredClientRequest associations
// (inherits client association from base RequestTemplate)

// NonRegisteredClientRequest associations
// (fields are embedded, no association)

// HiringOrOutsourcingRequest associations
HiringOrOutsourcingRequest.belongsTo(JobAdvertisement, { as: 'jobAdvertisement' });
HiringOrOutsourcingRequest.belongsTo(Department, { as: 'requestingDepartment' });

// BudgetAdjustmentRequest associations
BudgetAdjustmentRequest.belongsTo(Department, { as: 'requestingDepartment' });
BudgetAdjustmentRequest.belongsTo(Application, { as: 'applicationReference' });

const passwordHash = await bcrypt.hash('test', await bcrypt.genSalt());
// Sample data initialization function
const initSampleData = async () => {
    // Employees
    const alice = await Employee.create({
        name: 'Alice',
        username: 'alice',
        password: passwordHash,
        email: 'alice@sep.com',
        jobTitle: 'Manager'
    });
    const bob = await Employee.create({
        name: 'Bob',
        username: 'bob',
        password: passwordHash,
        email: 'bob@sep.com',
        jobTitle: 'Staff'
    });

    // Department with manager
    const itDept = await Department.create({ name: 'Services' });
    await itDept.setManager(alice);

    // Team under department (use hasMany side magic method since Team.belongsTo is commented out)
    const teamA = await Team.create({ name: 'Team A' });
    await itDept.addTeam(teamA);
    // console.log((await Department.findAll({ include: 'teams' })).forEach(dept => {
    //     console.log(dept.name);
    //     dept.teams.forEach(team => console.log(` - ${team.name}`));
    // }));

    // Assign employees to team (Employee.belongsTo Team is active)
    await alice.setMemberOfTeam(teamA);
    await bob.setMemberOfTeam(teamA);

    // Client and application (use hasMany side magic method since Application.belongsTo Client is commented out)
    const client = await Client.create({
        name: 'Acme Corp',
        email: 'contact@acme.com',
        businessCode: 'AC123',
        address: '123 Main St, New York, NY',
        eligibleForDiscount: true,
    });

    const client2 = await Client.create({
        name: 'Luna Events',
        email: 'hello@lunaevents.co',
        businessCode: 'LN567',
        address: '42 Crescent Road, London, UK',
        eligibleForDiscount: false,
    });

    const client3 = await Client.create({
        name: 'Nordic Tech AB',
        email: 'info@nordictech.se',
        businessCode: 'NT890',
        address: 'Sveavägen 10, Stockholm, Sweden',
        eligibleForDiscount: true,
    });

    const client4 = await Client.create({
        name: 'Sunset Catering',
        email: 'bookings@sunsetcatering.com',
        businessCode: 'SC432',
        address: '500 Ocean Drive, Miami, FL',
        eligibleForDiscount: false,
    });

    const app = await Application.create({
        eventType: 'Conference',
        description: 'Annual IT Conference',
        expectedNumberOfAttendees: 100,
        budget: 5000,
        startsOn: new Date(),
        endsOn: new Date(),
        otherNeeds: 'Projector',
        status: 'Open',
        clientId: client2.id
    });
    // Application.findAll().then(apps => console.log(apps));

    // Task authored by Alice, assigned to Bob, linked to the application
    const task = await Task.create({
        description: 'Setup venue',
        startsOn: new Date(),
        endsOn: new Date(),
        priority: 'High',
        status: 'Pending'
    });
    await task.setAuthor(alice);
    await task.setAssignedTo(bob);
    await task.setApplicationReference(app);

    // Request preferences
    const prefsRegistered = await RequestPreferences.create({
        decorations: true,
        parties: false,
        photosOrFilming: true,
        breakfastLunchDinner: true,
        softHotDrinks: true
    });

    const prefsNonRegistered = await RequestPreferences.create({
        decorations: false,
        parties: true,
        photosOrFilming: false,
        breakfastLunchDinner: false,
        softHotDrinks: true
    });

    // Registered client request via subclass (scoped model)
    const registeredRequest = await RegisteredClientRequest.create({
        type: 'registered',
        recordNumber: 2001,
        eventType: 'Corporate Event',
        startsOn: new Date(),
        endsOn: new Date(),
        status: 'Submitted',
        estimatedBudget: 10000,
        expectedNumberOfAttendees: 100,
    });
    await registeredRequest.setPreferences(prefsRegistered);
    await registeredRequest.setClient(client);
    await registeredRequest.setCreatedBy(alice);

    // Non-registered client request via subclass (scoped model)
    const nonRegisteredRequest = await NonRegisteredClientRequest.create({
        type: 'non_registered',
        recordNumber: 2002,
        eventType: 'Private Party',
        startsOn: new Date(),
        endsOn: new Date(),
        status: 'Draft',
        estimatedBudget: 3000,
        name: 'John Doe',
        email: 'john.doe@example.com',
        businessCode: 'JD-001',
        address: '42 Example Rd',
        expectedNumberOfAttendees: 100,
    });
    await nonRegisteredRequest.setPreferences(prefsNonRegistered);
    await nonRegisteredRequest.setCreatedBy(bob);

    // Event for an existing client
    const event = await Event.create({
        date: new Date(),
        finalBudget: 4800,
        attendees: 95,
        details: 'Finalized event details after planning phase.'
    });
    await event.setClient(client2);

    // Hiring or outsourcing request linked to a job advertisement and department
    const jobAd = await JobAdvertisement.create({
        jobTitle: 'Frontend Engineer',
        description: 'React + Vite experience required',
        startsOn: new Date(),
        endsOn: new Date(),
        contractType: 'Full-time',
        yearsOfExperience: 3,
        status: 'Published'
    });
    const hiringReq = await HiringOrOutsourcingRequest.create({
        status: 'Approved'
    });
    await hiringReq.setJobAdvertisement(jobAd);
    await hiringReq.setRequestingDepartment(itDept);

    // Budget adjustment request associated to department and application
    const budgetAdj = await BudgetAdjustmentRequest.create({
        requiredAmount: 1500,
        reason: 'Unexpected vendor surcharge'
    });
    await budgetAdj.setRequestingDepartment(itDept);
    await budgetAdj.setApplicationReference(app);

    // create a new senior customer service officer
    const charlie = await Employee.create({
        name: 'Charlie',
        username: 'charlie',
        password: passwordHash,
        email: 'charlie@example.com',
        jobTitle: 'Senior Customer Service Officer'
    });

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
