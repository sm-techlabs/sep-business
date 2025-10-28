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
Team.hasMany(Employee, { as: 'employees', foreignKey: 'TeamId' });
// Team.belongsTo(Department, { as: 'department' });

// Employee associations
Employee.belongsTo(Team, { as: 'memberOfTeam', foreignKey: 'TeamId' });
Employee.hasMany(Task, { as: 'tasks', foreignKey: 'assignedToId' });
Employee.hasMany(Task, { as: 'assignmentHistory', foreignKey: 'authorId' });

// Task associations
Task.belongsTo(Employee, { as: 'author', foreignKey: 'authorId' });
Task.belongsTo(Employee, { as: 'assignedTo', foreignKey: 'assignedToId' });
Task.belongsTo(Application, { as: 'applicationReference' });
Task.belongsTo(Team, { as: 'subteam' });

// Application associations
// Application.belongsTo(Client, { as: 'client' });
Application.hasMany(Task, { as: 'tasks' });
Application.belongsTo(ApplicationPreferences, { as: 'preferences' });
Application.belongsTo(Client, { as: 'client' });

RequestTemplate.hasOne(RequestPreferences, {
    as: 'preferences',
    foreignKey: 'requestTemplateId',
    onDelete: 'CASCADE',
    hooks: true
});
RequestTemplate.belongsTo(Employee, { as: 'createdBy' });
RequestTemplate.belongsTo(Client, { as: 'client' });
RequestTemplate.belongsTo(Employee, { as: 'reviewedBy'});

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

const passwordHash = await bcrypt.hash('pwd', await bcrypt.genSalt());
// Sample data initialization function
const initSampleData = async () => {
    // Employees

    // Financial Dept
    const alice = await Employee.create({
        name: 'Alice',
        username: 'alice',
        password: passwordHash,
        email: 'alice@sep.com',
        jobTitle: 'Financial Manager'
    });

    // HR Dept
    const simon = await Employee.create({
        name: 'Simon',
        username: 'simon',
        password: passwordHash,
        email: 'simon@sep.com',
        jobTitle: 'Senior HR Manager'
    });
    const maria = await Employee.create({
        name: 'Maria',
        username: 'maria',
        password: passwordHash,
        email: 'maria@sep.com',
        jobTitle: 'HR Assistant'
    });

    // Customer Service Dept
    const janet = await Employee.create({
        name: 'Janet',
        username: 'janet',
        password: passwordHash,
        email: 'janet@sep.com',
        jobTitle: 'Senior Customer Service Officer'
    });
    const sarah = await Employee.create({
        name: 'Sarah',
        username: 'sarah',
        password: passwordHash,
        email: 'sarah@sep.com',
        jobTitle: 'Customer Service Officer'
    });
    
    // Production Dept
    const jack = await Employee.create({
        name: 'Jack',
        username: 'jack',
        password: passwordHash,
        email: 'jack@sep.com',
        jobTitle: 'Production Manager'
    });
    const magy = await Employee.create({
        name: 'Magy',
        username: 'magy',
        password: passwordHash,
        email: 'magy@sep.com',
        jobTitle: 'Decorating Architect'
    });
    const angelina = await Employee.create({
        name: 'Angelina',
        username: 'angelina',
        password: passwordHash,
        email: 'angelina@sep.com',
        jobTitle: 'Decorating Assistant'
    });
    const don = await Employee.create({
        name: 'Don',
        username: 'don',
        password: passwordHash,
        email: 'don@sep.com',
        jobTitle: 'Decorating Assistant'
    });
    const tobias = await Employee.create({
        name: 'Tobias',
        username: 'tobias',
        password: passwordHash,
        email: 'tobias@sep.com',
        jobTitle: 'Photographer'
    });
    const christian = await Employee.create({
        name: 'Christian',
        username: 'christian',
        password: passwordHash,
        email: 'christian@sep.com',
        jobTitle: 'Network Engineer'
    });
    const julia = await Employee.create({
        name: 'Julia',
        username: 'julia',
        password: passwordHash,
        email: 'julia@sep.com',
        jobTitle: 'Graphic Designer'
    });
    const antony = await Employee.create({
        name: 'Antony',
        username: 'antony',
        password: passwordHash,
        email: 'antony@sep.com',
        jobTitle: 'Audio Engineer'
    });
    
    
    // Services Dept
    const natalie = await Employee.create({
        name: 'Natalie',
        username: 'natalie',
        password: passwordHash,
        email: 'natalie@sep.com',
        jobTitle: 'Service Manager'
    });
    const helen = await Employee.create({
        name: 'Helen',
        username: 'helen',
        password: passwordHash,
        email: 'helen@sep.com',
        jobTitle: 'Head Chef'
    });
    const kate = await Employee.create({
        name: 'Kate',
        username: 'kate',
        password: passwordHash,
        email: 'kate@sep.com',
        jobTitle: 'Senior Waitress'
    });

    //
    const admin = await Employee.create({
        name: 'Admin',
        username: 'admin',
        password: passwordHash,
        email: 'admin@sep.com',
        jobTitle: 'Admin'
    });
    const mike = await Employee.create({
        name: 'Mike',
        username: 'mike',
        password: passwordHash,
        email: 'mike@sep.com',
        jobTitle: 'Administration Manager'
    });

    // Department with manager
    const productionDept = await Department.create({ name: 'Production' });
    const serviceDept = await Department.create({ name: 'Service' });
    await productionDept.setManager(jack);
    await serviceDept.setManager(natalie);
    

    // Team under department (use hasMany side magic method since Team.belongsTo is commented out)
    const decoration = await Team.create({ name: 'Decoration' });
    const photography = await Team.create({ name: 'Photography' });
    const audio = await Team.create({ name: 'Audio' });
    const graphicDesign = await Team.create({ name: 'Graphic Design' });
    const network = await Team.create({ name: 'Network' });
    
    await productionDept.addTeam(decoration);
    await productionDept.addTeam(photography);
    await productionDept.addTeam(audio);
    await productionDept.addTeam(graphicDesign);
    await productionDept.addTeam(network);

    // Assign employees to team (Employee.belongsTo Team is active)
    await magy.setMemberOfTeam(decoration);
    await angelina.setMemberOfTeam(decoration);
    await don.setMemberOfTeam(decoration);
    // Assign employees to team (Employee.belongsTo Team is active)
    await christian.setMemberOfTeam(network);
    await tobias.setMemberOfTeam(photography);
    await julia.setMemberOfTeam(graphicDesign);
    await antony.setMemberOfTeam(audio);
    
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
    
    const app2 = await Application.create({
        eventType: 'Workshop',
        description: 'Frontend Development with React',
        expectedNumberOfAttendees: 25,
        budget: 1500,
        startsOn: new Date('2025-11-15T09:00:00Z'),
        endsOn: new Date('2025-11-15T17:00:00Z'),
        otherNeeds: 'WiFi, Whiteboard, Coffee Break',
        status: 'Pending',
        clientId: client.id
    });

    const app3 = await Application.create({
        eventType: 'Corporate Party',
        description: 'End-of-Year Celebration for Company Staff',
        expectedNumberOfAttendees: 200,
        budget: 8000,
        startsOn: new Date('2025-12-20T18:00:00Z'),
        endsOn: new Date('2025-12-21T01:00:00Z'),
        otherNeeds: 'Catering, DJ, Decorations',
        status: 'Approved',
        clientId: client3.id
    });


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
        eventType: 'Private Party',
        startsOn: new Date(),
        endsOn: new Date(),
        status: 'Submitted',
        estimatedBudget: 3000,
        name: 'John Doe',
        email: 'john.doe@example.com',
        businessCode: 'JD-001',
        address: '42 Example Rd',
        expectedNumberOfAttendees: 100,
    });
    await nonRegisteredRequest.setPreferences(prefsNonRegistered);
    // await nonRegisteredRequest.setCreatedBy(bob);

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
    // const hiringReq = await HiringOrOutsourcingRequest.create({
    //     status: 'Approved'
    // });
    // await hiringReq.setJobAdvertisement(jobAd);
    // await hiringReq.setRequestingDepartment(itDept);

    // Budget adjustment request associated to department and application
    // const budgetAdj = await BudgetAdjustmentRequest.create({
    //     requiredAmount: 1500,
    //     reason: 'Unexpected vendor surcharge'
    // });
    // await budgetAdj.setRequestingDepartment(itDept);
    // await budgetAdj.setApplicationReference(app);
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
