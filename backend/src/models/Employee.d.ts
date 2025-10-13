import type {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize';

// Forward minimal types for associated models to provide method signatures
// These will be replaced with rich types once their .d.ts files are added.
declare class Team extends Model {}
declare class Task extends Model {}

export default class Employee extends Model<
  InferAttributes<Employee>,
  InferCreationAttributes<Employee>
> {
  // Attributes
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare jobTitle: 'Manager' | 'Coordinator' | 'Staff' | 'Intern';
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  // Associations
  // Employee.belongsTo(Team, { as: 'memberOfTeam' })
  declare getMemberOfTeam: BelongsToGetAssociationMixin<Team>;
  declare setMemberOfTeam: BelongsToSetAssociationMixin<Team, number>;

  // Employee.hasMany(Task, { as: 'tasks', foreignKey: 'assignedToId' })
  declare getTasks: HasManyGetAssociationsMixin<Task>;
  declare addTask: HasManyAddAssociationMixin<Task, number>;
  declare hasTask: HasManyHasAssociationMixin<Task, number>;
  declare countTasks: HasManyCountAssociationsMixin;
  declare createTask: HasManyCreateAssociationMixin<Task>;

  // Employee.hasMany(Task, { as: 'assignmentHistory', foreignKey: 'authorId' })
  declare getAssignmentHistory: HasManyGetAssociationsMixin<Task>;
  declare addAssignmentHistory: HasManyAddAssociationMixin<Task, number>;
  declare hasAssignmentHistory: HasManyHasAssociationMixin<Task, number>;
  declare countAssignmentHistory: HasManyCountAssociationsMixin;
  declare createAssignmentHistory: HasManyCreateAssociationMixin<Task>;
}

// // Map ESM import specifiers to this declaration for IntelliSense
// declare module '../models/Employee.js' {
//   import Employee from './Employee';
//   export default Employee;
// }
