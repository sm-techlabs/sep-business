import type {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize';

declare class Client extends Model {}
declare class ApplicationPreferences extends Model {}
declare class Task extends Model {}

export default class Application extends Model<
  InferAttributes<Application>,
  InferCreationAttributes<Application>
> {
  declare id: CreationOptional<number>;
  declare eventType: string | null;
  declare description: string | null;
  declare expectedNumberOfAttendees: number | null;
  declare budget: number | null;
  declare startsOn: Date | null;
  declare endsOn: Date | null;
  declare otherNeeds: string | null;
  declare status: 'Draft' | 'Open' | 'InProgress' | 'OnHold' | 'Closed' | 'Archived' | 'Cancelled';
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Application.belongsTo(ApplicationPreferences, { as: 'preferences' })
  declare getPreferences: BelongsToGetAssociationMixin<ApplicationPreferences>;
  declare setPreferences: BelongsToSetAssociationMixin<ApplicationPreferences, number>;

  // Application.belongsTo(Client, { as: 'client' })
  declare getClient: BelongsToGetAssociationMixin<Client>;
  declare setClient: BelongsToSetAssociationMixin<Client, number>;

  // Application.hasMany(Task, { as: 'tasks' })
  declare getTasks: HasManyGetAssociationsMixin<Task>;
  declare addTask: HasManyAddAssociationMixin<Task, number>;
  declare hasTask: HasManyHasAssociationMixin<Task, number>;
  declare countTasks: HasManyCountAssociationsMixin;
  declare createTask: HasManyCreateAssociationMixin<Task>;
}

declare module '../models/Application.js' {
  import Application from './Application';
  export default Application;
}
