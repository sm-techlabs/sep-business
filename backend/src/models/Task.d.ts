import type {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from 'sequelize';

declare class Employee extends Model {}
declare class Application extends Model {}

export default class Task extends Model<
  InferAttributes<Task>,
  InferCreationAttributes<Task>
> {
  declare id: CreationOptional<number>;
  declare startsOn: Date | null;
  declare endsOn: Date | null;
  declare description: string | null;
  declare comments: string | null;
  declare priority: 'Low' | 'Medium' | 'High';
  declare status: 'Pending' | 'InProgress' | 'Completed';
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Task.belongsTo(Employee, { as: 'author' })
  declare getAuthor: BelongsToGetAssociationMixin<Employee>;
  declare setAuthor: BelongsToSetAssociationMixin<Employee, number>;

  // Task.belongsTo(Employee, { as: 'assignedTo' })
  declare getAssignedTo: BelongsToGetAssociationMixin<Employee>;
  declare setAssignedTo: BelongsToSetAssociationMixin<Employee, number>;

  // Task.belongsTo(Application, { as: 'applicationReference' })
  declare getApplicationReference: BelongsToGetAssociationMixin<Application>;
  declare setApplicationReference: BelongsToSetAssociationMixin<Application, number>;
}
